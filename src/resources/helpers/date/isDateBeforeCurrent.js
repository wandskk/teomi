export function isDateBeforeCurrent(dateString) {
  // Split the date string into day, month, and year
  var parts = dateString.split("/");
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1; // Subtract 1 from the month since months in JavaScript are zero-based
  var year = parseInt(parts[2], 10);

  // Create a date object for the provided date (ignoring hours, minutes, seconds, and milliseconds)
  var providedDate = new Date(year, month, day, 0, 0, 0, 0);

  // Get the current date (ignoring hours, minutes, seconds, and milliseconds)
  var currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Compare the dates
  if (providedDate < currentDate) {
    return true; // The provided date is before the current date
  } else {
    return false; // The provided date is not before the current date
  }
}
