export function validateGoogleMeetLink(link) {
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    link = "https://" + link;
  }

  const regex = /^https:\/\/meet\.google\.com\/[a-z0-9-]+$/;

  return regex.test(link);
}
