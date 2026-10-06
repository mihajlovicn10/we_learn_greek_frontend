import i18n from '../i18n';

/**
 * Build URLSearchParams, omitting null, undefined, and empty-string values.
 */
export function buildQueryParams(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value);
    }
  });
  return searchParams;
}

/**
 * Normalize Django paginated `{ count, results }` or plain array responses.
 */
export function normalizeListResponse(data) {
  if (Array.isArray(data)) return data;
  if (data?.results && Array.isArray(data.results)) return data.results;
  return [];
}

/**
 * Extract pagination metadata from a DRF paginated response.
 */
export function getPaginationMeta(data, pageSize = 12) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { count: 0, totalPages: 1 };
  }
  const count = data.count ?? 0;
  return {
    count,
    totalPages: Math.max(1, Math.ceil(count / pageSize)),
  };
}

/**
 * User-facing message for a failed API request (never raw axios text like "Network Error").
 */
export function getErrorMessage(error, fallback = i18n.t('errors.generic')) {
  if (!error) return null;
  if (!error.response) return i18n.t('errors.unreachable');
  if (error.response.status === 429) return rateLimitMessage(error);
  // DRF uses {detail}; the auth endpoints use {error}.
  return error.response.data?.detail || error.response.data?.error || fallback;
}

/** 429 → "Too many requests, try again in N seconds", using the API's Retry-After header. */
export function rateLimitMessage(error) {
  const seconds = Number.parseInt(error?.response?.headers?.['retry-after'], 10);
  return Number.isFinite(seconds) && seconds > 0
    ? i18n.t('errors.rateLimitedFor', { count: seconds })
    : i18n.t('errors.rateLimited');
}
