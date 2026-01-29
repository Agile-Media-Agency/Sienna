export function yearsBetween(dateISO: string, anchorISO: string): number {
  const dob = new Date(dateISO);
  const at = new Date(anchorISO);
  if (isNaN(dob.getTime()) || isNaN(at.getTime())) return NaN;
  let years = at.getFullYear() - dob.getFullYear();
  const m = at.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && at.getDate() < dob.getDate())) years--;
  return years;
}

export function todayISO(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function dateWhenSiennaWasN(siennaBirthISO: string, nYears: number): string {
  const dob = new Date(siennaBirthISO);
  if (isNaN(dob.getTime())) return "";
  const anchor = new Date(dob);
  anchor.setFullYear(dob.getFullYear() + nYears);
  return anchor.toISOString().slice(0, 10);
}

