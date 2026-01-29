#!/usr/bin/env python3
import csv, os, glob, sys
from datetime import datetime

RAW_DIR = os.path.join('data','raw')
WORK_DIR = os.path.join('data','work')
CLEAN_DIR = os.path.join('data','clean')

NAME_CANDIDATES = ['event','name','label','title']
DATE_CANDIDATES = ['date','event_date']

def ensure_dirs():
  os.makedirs(WORK_DIR, exist_ok=True)
  os.makedirs(CLEAN_DIR, exist_ok=True)

def pick_col(headers, candidates):
  lower = [h.lower() for h in headers]
  for c in candidates:
    if c in lower:
      return headers[lower.index(c)]
  return None

def parse_date(s):
  if not s: return ''
  s = s.strip()
  try:
    return datetime.strptime(s,'%Y-%m-%d').strftime('%Y-%m-%d')
  except Exception:
    pass
  for fmt in ['%m/%d/%Y','%d/%m/%Y','%b %d, %Y','%B %d, %Y']:
    try:
      return datetime.strptime(s,fmt).strftime('%Y-%m-%d')
    except Exception:
      continue
  return ''

def slugify(s):
  t = ''.join(ch.lower() if ch.isalnum() else '-' for ch in s)
  while '--' in t: t = t.replace('--','-')
  return t.strip('-')

def main():
  ensure_dirs()
  raw_rows = []
  files = sorted(glob.glob(os.path.join(RAW_DIR,'*.csv')))
  if not files:
    print('No raw CSVs found in data/raw. Place source files there.', file=sys.stderr)
  for fp in files:
    with open(fp, newline='', encoding='utf-8') as f:
      reader = csv.DictReader(f)
      headers = reader.fieldnames or []
      name_col = pick_col(headers, NAME_CANDIDATES)
      date_col = pick_col(headers, DATE_CANDIDATES)
      if not name_col or not date_col:
        continue
      for idx, row in enumerate(reader, start=2):
        name = (row.get(name_col) or '').strip()
        if not name: continue
        d = parse_date(row.get(date_col) or '')
        raw_rows.append({'name': name, 'date': d})

  # dedupe by (name,date)
  seen = set(); out = []
  for r in raw_rows:
    key = (r['name'].lower(), r['date'])
    if key in seen: continue
    seen.add(key)
    out.append({'id': slugify(r['name']), 'name': r['name'], 'date': r['date']})

  work_csv = os.path.join(WORK_DIR,'events_raw.csv')
  with open(work_csv,'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=['name','date'])
    w.writeheader(); w.writerows(raw_rows)

  clean_csv = os.path.join(CLEAN_DIR,'events.csv')
  with open(clean_csv,'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=['id','name','date'])
    w.writeheader(); w.writerows(out)

  print(f"Wrote {work_csv}, {clean_csv}")

if __name__ == '__main__':
  main()

