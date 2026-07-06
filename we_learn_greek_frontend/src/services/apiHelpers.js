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
