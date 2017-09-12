import { environment } from 'environments/environment';

/**
 * apiUrl Get an api url and wrap it based on the environment
 * @param {string} pathName
 * @returns {string} The env-aware api url
 */
export const apiUrl = (pathName: string) => (
  `${environment.api.base}${environment.api[pathName]}`);
