export function validateGoogleMeetLink(link) {
  const regex = /^https:\/\/meet\.google\.com\/[a-z0-9-]+$/;

  return regex.test(link);
}
