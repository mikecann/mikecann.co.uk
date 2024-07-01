import { wrap } from "./num";

export const quickHash = (s: string) => {
  let hash = 0;
  let i;
  let chr;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const wrapIndex = (s: string, items: any[]) => wrap(quickHash(s), 0, items.length - 1);

export const oneFromArrayBasedOnString = <T>(s: string, items: T[]): T =>
  items[wrap(quickHash(s), 0, items.length - 1)!]!;
