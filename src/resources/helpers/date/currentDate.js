export function currentDate() {
  var currentDate = new Date();
  var day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if needed
  var month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  var year = currentDate.getFullYear();

  return day + "/" + month + "/" + year;
}
