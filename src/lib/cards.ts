import { SyncEngine } from './syncEngine';

export interface SavedCard {
  id: string;
  owner: string; // username
  kind: 'team' | 'general';
  title: string;
  subtitle: string;
  message: string;
  savedAt: number;
}

const KEY_PREFIX = 'mirsad_cards_';
const SEEN_KEY = 'mirsad_congrats_seen_';

function norm(username: string): string {
  return (username || '').toLowerCase().trim();
}

export function getSavedCards(username: string): SavedCard[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEY_PREFIX + norm(username));
  return raw ? JSON.parse(raw) : [];
}

export function saveCard(
  username: string,
  card: Omit<SavedCard, 'id' | 'owner' | 'savedAt'>
): SavedCard {
  const clean = norm(username);
  const cards = getSavedCards(clean);
  const newCard: SavedCard = {
    ...card,
    id: `card_${Date.now()}`,
    owner: clean,
    savedAt: Date.now(),
  };
  cards.push(newCard);
  localStorage.setItem(KEY_PREFIX + clean, JSON.stringify(cards));
  return newCard;
}

export function hasCardByTitle(username: string, title: string): boolean {
  return getSavedCards(norm(username)).some(c => c.title === title);
}

// يحفظ أن هذا المستخدم شاهد صفحة التهنئة (لتفادي عرضها كل مرة)
export function markCongratsSeen(username: string) {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  const clean = norm(username);
  if (!clean) return;
  const seen: string[] = JSON.parse(localStorage.getItem(SEEN_KEY) || '[]');
  if (!seen.includes(clean)) {
    seen.push(clean);
    localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  }
}

export function hasSeenCongrats(username: string): boolean {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return false;
  const clean = norm(username);
  if (!clean) return false;
  const seen: string[] = JSON.parse(localStorage.getItem(SEEN_KEY) || '[]');
  return seen.includes(clean);
}

export function resetUserCongratsState(username: string): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  const clean = norm(username);
  if (!clean) return;
  try {
    const seen: string[] = JSON.parse(localStorage.getItem(SEEN_KEY) || '[]');
    const filtered = seen.filter((u) => norm(u) !== clean);
    localStorage.setItem(SEEN_KEY, JSON.stringify(filtered));
    localStorage.removeItem(KEY_PREFIX + clean);
  } catch {
    // ignore
  }
}

export function resetAllCongratsState(): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  localStorage.removeItem(SEEN_KEY);
}

