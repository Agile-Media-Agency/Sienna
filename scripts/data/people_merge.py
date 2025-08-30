#!/usr/bin/env python3
import csv, os, glob, sys
from datetime import datetime

RAW_DIR = os.path.join('data','raw')
WORK_DIR = os.path.join('data','work')
CLEAN_DIR = os.path.join('data','clean')
ALIASES_CSV = os.path.join('data','config','aliases.csv')

NAME_CANDIDATES = [
  'name','person','full_name','display_name','channel','channel_name','artist','title'
]
DOB_CANDIDATES = [
  'birthdate','birth_date','dob','date_of_birth','birthday','date'
]

def ensure_dirs():
  os.makedirs(WORK_DIR, exist_ok=True)
  os.makedirs(CLEAN_DIR, exist_ok=True)

def load_aliases(path):
  m = {}
  if not os.path.exists(path):
    return m
  with open(path, newline='', encoding='utf-8') as f:
    r = csv.DictReader(f)
    for row in r:
      alias = (row.get('alias') or '').strip().lower()
      canon = (row.get('canonical') or '').strip()
      if alias and canon:
        m[alias] = canon
  return m

def pick_col(headers, candidates):
  lower = [h.lower() for h in headers]
  for c in candidates:
    if c in lower:
      return headers[lower.index(c)]
  return None

def parse_date(s):
  if not s: return ''
  s = s.strip()
  # already ISO
  try:
    dt = datetime.strptime(s, '%Y-%m-%d')
    return dt.strftime('%Y-%m-%d')
  except Exception:
    pass
  fmts = [
    '%m/%d/%Y','%d/%m/%Y','%m/%d/%y','%d/%m/%y',
    '%b %d, %Y','%B %d, %Y','%d %b %Y','%d %B %Y'
  ]
  for fmt in fmts:
    try:
      dt = datetime.strptime(s, fmt)
      return dt.strftime('%Y-%m-%d')
    except Exception:
      continue
  return ''

def slugify(s):
  t = ''.join(ch.lower() if ch.isalnum() else '-' for ch in s)
  while '--' in t: t = t.replace('--','-')
  return t.strip('-')

def main():
  ensure_dirs()
  aliases = load_aliases(ALIASES_CSV)

  raw_rows = []
  files = sorted(glob.glob(os.path.join(RAW_DIR,'*.csv')))
  if not files:
    print('No raw CSVs found in data/raw. Place source files there.', file=sys.stderr)
  for fp in files:
    with open(fp, newline='', encoding='utf-8') as f:
      reader = csv.DictReader(f)
      headers = reader.fieldnames or []
      name_col = pick_col(headers, NAME_CANDIDATES)
      dob_col = pick_col(headers, DOB_CANDIDATES)
      if not name_col:
        print(f"Skip {fp}: no recognizable name column", file=sys.stderr)
        continue
      for idx, row in enumerate(reader, start=2):
        name = (row.get(name_col) or '').strip()
        if not name: continue
        dob_raw = (row.get(dob_col) or '').strip() if dob_col else ''
        dob_iso = parse_date(dob_raw)
        key_alias = name.strip().lower()
        canonical = aliases.get(key_alias, name)
        raw_rows.append({
          'source_file': os.path.basename(fp),
          'row': idx,
          'name': name,
          'canonical_name': canonical,
          'birth_date_iso': dob_iso,
        })

  # write work/people_raw.csv
  work_csv = os.path.join(WORK_DIR,'people_raw.csv')
  with open(work_csv, 'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=['source_file','row','name','canonical_name','birth_date_iso'])
    w.writeheader(); w.writerows(raw_rows)

  # exact dedupe by (canonical_name_lower, birth_date_iso)
  seen = {}
  out = []
  for r in raw_rows:
    key = (r['canonical_name'].strip().lower(), r['birth_date_iso'])
    if key in seen: continue
    seen[key] = True
    base_id = slugify(r['canonical_name'])
    if r['birth_date_iso']:
      yr = r['birth_date_iso'][:4]
      pid = f"{base_id}-{yr}"
    else:
      pid = base_id
    out.append({'id': pid, 'name': r['canonical_name'], 'birth_date': r['birth_date_iso']})

  clean_csv = os.path.join(CLEAN_DIR,'people.csv')
  with open(clean_csv,'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=['id','name','birth_date'])
    w.writeheader(); w.writerows(out)

  # simple review file: same name different dates, same date different names
  name_to_dates = {}
  date_to_names = {}
  for r in raw_rows:
    n = r['canonical_name'].strip()
    d = r['birth_date_iso']
    if n: name_to_dates.setdefault(n,set()).add(d)
    if d: date_to_names.setdefault(d,set()).add(n)
  review_path = os.path.join(WORK_DIR,'people_review.csv')
  with open(review_path,'w', newline='', encoding='utf-8') as f:
    w = csv.writer(f)
    w.writerow(['kind','name_or_date','values'])
    for n, dates in name_to_dates.items():
      if len(dates) > 1:
        w.writerow(['same_name_varied_dates', n, ';'.join(sorted(dates))])
    for d, names in date_to_names.items():
      if len(names) > 1:
        w.writerow(['same_date_varied_names', d, ';'.join(sorted(names))])

  print(f"Wrote {work_csv}, {review_path}, {clean_csv}")

if __name__ == '__main__':
  main()

