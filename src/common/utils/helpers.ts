/**
 * Builds a URL with query parameters.
 *
 * @param route - The base route URL.
 * @param params - An object with query parameters. If a parameter is an array, each value will be added as its own query parameter.
 * @returns The URL with encoded query parameters.
 */
export const buildUrlWithQueryParams = (
  route: string,
  params: Record<string, string | number | Array<string | number> | undefined>,
): string => {
  const queryParts: string[] = [];

  for (const key in params) {
    if (!Object.prototype.hasOwnProperty.call(params, key)) continue;

    const value = params[key];
    if (value === undefined) continue;

    if (Array.isArray(value)) {
      value.forEach((val) => {
        queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`);
      });
    } else {
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }

  if (queryParts.length > 0) {
    return `${route}?${queryParts.join("&")}`;
  }

  return route;
};

/**
 * Resolves an object with query parameters to an object with only defined values.
 *
 * @param payload - An object with query parameters.
 * @returns An object with only defined values.
 */
export const resolveBuildQueryParamsPayload = (
  payload: Record<string, string | number | Array<string | number> | undefined>,
) => {
  const result: typeof payload = {};

  for (const key in payload) {
    const value = payload[key];

    if (value) {
      if (Array.isArray(value)) {
        result[key] = value.length ? value : undefined;
      } else {
        result[key] = value;
      }
    } else {
      result[key] = undefined;
    }
  }

  return result;
};

/**
 * Converts a pixel value to rem
 */
export const pxToRem = (px: number): string => {
  return `${px / 16}rem`;
};

/**
 * Checks if a value is an object
 */
export const isObject = (item: any): boolean => {
  return item && typeof item === "object" && !Array.isArray(item);
};

/**
 * Returns the initials from a string.
 *
 * @param name - The name from which to derive initials.
 */
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};