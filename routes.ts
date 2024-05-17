/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/emailverification"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to the settings page
 * @type {string[]}
 */
export const authRoutes: string[] = ["/login", "/register", "/error", "/reset"];

/**
 * The prefix for for API authentication routes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after a user logs in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
