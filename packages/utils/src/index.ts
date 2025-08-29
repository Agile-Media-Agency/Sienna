export function formatAgeMonths(totalMonths: number): string {
  if (!Number.isFinite(totalMonths) || totalMonths < 0) return "";
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [] as string[];
  if (years) parts.push(`${years} year${years === 1 ? '' : 's'}`);
  if (months) parts.push(`${months} month${months === 1 ? '' : 's'}`);
  return parts.join(" ") || "0 months";
}

export const a11y = {
  prefersReducedMotion: () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
};

