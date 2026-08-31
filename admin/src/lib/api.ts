const envApiUrl = (import.meta as any).env?.VITE_API_URL as string | undefined;

export const API_BASE_URL = envApiUrl
  ? `${envApiUrl.replace(/\/+$/, '')}/api`
  : '/api';
