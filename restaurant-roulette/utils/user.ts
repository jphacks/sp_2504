export const getOrCreateUserId = (): string => {
  const key = 'user_id';
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const newId = crypto.randomUUID();
  localStorage.setItem(key, newId);
  return newId;
};
