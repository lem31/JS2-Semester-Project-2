export async function handleApiError(response, context) {
  if (!response.ok) {
    const errorData = await response.json();
    const rawErrorMessage = JSON.stringify(errorData);

    const slicedErrorMessage =
      rawErrorMessage.length > 50
        ? rawErrorMessage.slice(22, -44)
        : rawErrorMessage;

    let userFriendlyMessage = 'An error occurred.';

    if (context === 'signIn') {
      userFriendlyMessage = `Login failed: ${slicedErrorMessage}`;
    } else if (context === 'register') {
      userFriendlyMessage = `Registration error: ${slicedErrorMessage}`;
    } else if (context === 'postBid') {
      userFriendlyMessage = `Bid submission failed: ${slicedErrorMessage}`;
    } else if (context === 'fetchUserBids') {
      userFriendlyMessage = `Failed to fetch bids: ${slicedErrorMessage}`;
    } else if (context === 'postCreateListing') {
      userFriendlyMessage = `Listing creation failed: ${slicedErrorMessage}`;
    } else if (context === 'removeListing') {
      userFriendlyMessage = `Failed to delete listing: ${slicedErrorMessage}`;
    } else if (context === 'editListing') {
      userFriendlyMessage = `Failed to edit listing: ${slicedErrorMessage}`;
    } else if (context === 'fetchListing') {
      userFriendlyMessage = `Failed to fetch listing: ${slicedErrorMessage}`;
    } else if (context === 'getAllListings') {
      userFriendlyMessage = `Failed to fetch auction listings: ${slicedErrorMessage}`;
    } else if (context === 'displayIndividualListing') {
      userFriendlyMessage = `Failed to fetch listing details: ${slicedErrorMessage}`;
    } else if (context === 'getMyListings') {
      userFriendlyMessage = `Failed to fetch your listings: ${slicedErrorMessage}`;
    } else if (context === 'getUserProfile') {
      userFriendlyMessage = `Failed to fetch user profile: ${slicedErrorMessage}`;
    } else if (context === 'updateProfile') {
      userFriendlyMessage = `Failed to update profile: ${slicedErrorMessage}`;
    }

    throw new Error(userFriendlyMessage);
  }

  return response.json();
}
