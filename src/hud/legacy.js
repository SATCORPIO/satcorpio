/**
 * Back-compat for the hash routes the site used before the divisions became
 * pages. `#/kyrax` was the shareable link for two years of the site's life, so
 * anything still pointing there lands on the page rather than on a scene with a
 * fragment it no longer understands.
 *
 * Imported first from main.js so it runs before three.js is even evaluated  
 * there is no reason to build a WebGL scene for a page that is about to unload.
 * `replace`, not `assign`, so the redirect does not sit in the back stack.
 */
const PAGES = new Set(['kira', 'pulse', 'kyrax', 'anu', 'namtar']);

const id = (location.hash || '').replace(/^#\/?/, '');
if (PAGES.has(id)) location.replace(`${import.meta.env.BASE_URL}${id}/`);
