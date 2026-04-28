/**
 * Filters out headers that cause issues with outgoing fetch requests in Next.js
 * when forwarding from an incoming server request.
 * Specifically removes content-length and content-type to avoid mismatch errors
 * when the outgoing request has a different body or no body.
 */
export function getSafeHeaders(headers: Headers): Record<string, string> {
  const forbiddenHeaders = [
    'content-length',
    'host',
    'connection',
    'content-type',
    'transfer-encoding',
  ];

  const safeHeaders: Record<string, string> = {};

  headers.forEach((value, key) => {
    if (!forbiddenHeaders.includes(key.toLowerCase())) {
      safeHeaders[key] = value;
    }
  });

  return safeHeaders;
}
