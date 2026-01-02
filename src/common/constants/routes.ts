const API_VERSION = "v1";

// TODO: Add other routes spec as needed
export const ROUTES_SPEC = {
  ping: `/${API_VERSION}/`,

  // add all the routes here
  login: `/${API_VERSION}/auth/login`,
  
  // Frontend pages
  home: "/",
  marketplace: "/marketplace",
  borrowerDashboard: "/borrower-dashboard",
  lenderDashboard: "/lender-dashboard",
  borrowerFiatOffers: "/borrower-fiat-offers",
  lenderOffer: "/lender-offer",
  settings: "/settings",
} as const;

export const ROUTES = Object.fromEntries(Object.keys(ROUTES_SPEC).map((key) => [key, key])) as {
  [K in keyof typeof ROUTES_SPEC]: K;
};

type DynamicRoute<T extends any[] = string[]> = (...args: T) => string;
type RouteValueParameters<T> = T extends DynamicRoute<infer P> ? P : [];

/**
 * Resolves a route key to a URL string.
 * If the route is a string, returns it directly.
 * If the route is a function, calls it with the given arguments.
 *
 * @param key - The key of the route to resolve
 * @param args - Parameters required if the route is a function
 * @returns The fully resolved URL string
 */
export function resolveRoute<K extends keyof typeof ROUTES_SPEC>(
  key: K,
  ...args: RouteValueParameters<(typeof ROUTES_SPEC)[K]>
): string {
  const route = ROUTES_SPEC[key];

  if (typeof route === "string") {
    return route;
  }

  // @ts-ignore
  return route(...args);
}
