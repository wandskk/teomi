export function getNext10DaysFromDate(dateString) {
  var parts = dateString.split("/");
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1;
  var year = parseInt(parts[2], 10);

  var date = new Date(year, month, day);

  var result = [];

  if (!isNaN(date.getTime())) {
    var weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    for (var i = 0; i < 10; i++) {
      var currentDay = new Date(date);
      currentDay.setDate(date.getDate() + i);
      var formattedDate = currentDay.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      var dayOfWeek = weekdays[currentDay.getDay()];
      result.push({
        date: formattedDate,
        dayOfWeek: dayOfWeek,
      });
    }
  }

  return result;
}
