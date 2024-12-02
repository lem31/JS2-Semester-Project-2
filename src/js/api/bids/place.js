import { headers } from '../headers';

export async function postBidToAPI(LISTING_ID, BID_AMOUNT, event) {
  event.preventDefault();

  const URL = `https://v2.api.noroff.dev/auction/listings/${LISTING_ID}/bids`;
  console.log('Posting bid to URL:', URL);
  try {
    const RESPONSE = await fetch(URL, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ amount: Number(BID_AMOUNT) }),
    });
    if (RESPONSE.ok) {
      alert('Bid posted successfully');
      window.location.href = '/';
    }
    if (!RESPONSE.ok) {
      throw new Error('Failed to post bid');
    }

    const RESPONSE_DATA = await RESPONSE.json();
    console.log('Bid posted successfully', RESPONSE_DATA);
  } catch (error) {
    console.error('Error posting bid', error);
  }
}
