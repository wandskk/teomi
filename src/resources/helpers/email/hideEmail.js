export function hideEmail(email) {
  const parts = email.split("@");
  const username = parts[0];
  const domain = parts[1];

  const firstChar = username.charAt(0);
  const lastChar = username.charAt(username.length - 1);

  const maskedEmail =
    firstChar + "*".repeat(username.length - 2) + lastChar + "@" + domain;

  return maskedEmail;
}
