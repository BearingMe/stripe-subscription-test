export function loadRequiredEnvVariable(key: string) {
  const value = process.env[key];
  if (!value) throw new Error(`Unable to load ${key}`);

  return value;
}