export function getWeekdaysAroundDate(dateString) {
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1;
    var year = parseInt(parts[2], 10);
  
    var date = new Date(year, month, day);
  
    var result = [];
  
    if (!isNaN(date.getTime())) {
      var weekdays = ["Seg", "Ter", "Qua", "Qui", "Sex"];
      
      // Calculate the number of days to subtract and add for the weekdays
      var daysToSubtract = (date.getDay() + 6) % 7; // Days to subtract for Monday
      var daysToAdd = 4 - daysToSubtract; // Days to add for Friday
  
      for (var i = 0; i < 5; i++) {
        var currentDay = new Date(date);
        currentDay.setDate(day + i - daysToSubtract);
        var formattedDate = currentDay.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        result.push({
          name: weekdays[i],
          date: formattedDate,
        });
      }
    }
  
    return result;
  }
  