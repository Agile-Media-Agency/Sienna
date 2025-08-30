#!/usr/bin/env python3
import csv, json, os

CLEAN_DIR = os.path.join('data','clean')
SCHEMA_DIR = os.path.join('packages','content','src','schema')

def ensure_dirs():
  os.makedirs(SCHEMA_DIR, exist_ok=True)

def people_csv_to_json():
  path = os.path.join(CLEAN_DIR,'people.csv')
  if not os.path.exists(path):
    return False
  people = []
  with open(path, newline='', encoding='utf-8') as f:
    r = csv.DictReader(f)
    for row in r:
      if not row.get('name'): continue
      dob = row.get('birth_date') or ''
      people.append({
        'id': row.get('id') or row['name'],
        'label': row['name'],
        'birthDate': dob
      })
  out = {"$meta": {"version":1}, "people": people}
  with open(os.path.join(SCHEMA_DIR,'people.json'),'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
  return True

def events_csv_to_json():
  path = os.path.join(CLEAN_DIR,'events.csv')
  if not os.path.exists(path):
    return False
  events = []
  with open(path, newline='', encoding='utf-8') as f:
    r = csv.DictReader(f)
    for row in r:
      if not row.get('name'): continue
      events.append({
        'id': row.get('id') or row['name'],
        'label': row['name'],
        'date': row.get('date') or ''
      })
  out = {"$meta": {"version":1}, "events": events}
  with open(os.path.join(SCHEMA_DIR,'events.json'),'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=2)
  return True

def main():
  ensure_dirs()
  p = people_csv_to_json()
  e = events_csv_to_json()
  print(f"Exported people.json: {p}, events.json: {e}")

if __name__ == '__main__':
  main()

