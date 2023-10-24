export function formatDate(date) {
  const dateParts = date.split("/");

  if (dateParts.length === 3) {
    const day = dateParts[0];
    const monthNumeric = dateParts[1];
    const year = dateParts[2];

    const months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const month = months[monthNumeric - 1];

    const lastTwoDigitsYear = year.slice(-2);

    return ` ${day} de ${month}, ${lastTwoDigitsYear}`;
  }

  return date;
}
