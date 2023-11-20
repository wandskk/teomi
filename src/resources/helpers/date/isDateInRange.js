export function isDateInRange(dateString, startTime, endTime) {
  const [day, month, year] = dateString.split("/").map(Number);
  const inputDate = new Date(year, month - 1, day);

  const today = new Date();

  const isSameDate = inputDate.toDateString() === today.toDateString();

  if (!isSameDate) {
    return false;
  }

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const currentHour = today.getHours();
  const currentMinute = today.getMinutes();

  if (
    (currentHour > startHour ||
      (currentHour === startHour && currentMinute >= startMinute)) &&
    (currentHour < endHour ||
      (currentHour === endHour && currentMinute <= endMinute))
  ) {
    return true;
  }

  return false;
}
