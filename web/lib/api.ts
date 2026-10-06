export type EnquiryPayload = {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
};

/**
 * Placeholder for the form submit. Nothing is sent anywhere yet.
 * When the backend is ready, replace the body with a fetch() to the API, e.g.
 *   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, { method: 'POST', ... })
 * and throw if !res.ok. The form already handles loading, success and error states.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (process.env.NODE_ENV !== 'production') {
    console.info('[submitEnquiry] (not sent, backend not connected yet)', payload);
  }
}
