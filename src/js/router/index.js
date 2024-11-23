/**
 * This function controls which JavaScript file is loaded on which page
 * @async
 * @function router
 * @param {string} pathname - The path of the current page.
 * @returns {Promise<void>}
 *
 * @example
 * // Example of how to call the function
 * router();
 *
 *
 */

export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("./views/home.js");
      break;
    case "/auth/":
      await import("./views/auth.js");
      break;
    case "/listing/":
      await import("./views/listing.js");
      break;
    case "/my_listings/":
      await import("./views/myListings.js");
      break;
    case "/create/listing/":
      await import("./views/createListing.js");
      break;
    case "/edit/listing/":
      await import("./views/editListing.js");
      break;
    case "/my_bids/":
      await import("./views/myBids.js");
      break;
    case "/profile/":
      await import("./views/profile.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}
