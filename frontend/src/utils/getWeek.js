import { startOfWeek, addDays, format } from "date-fns";

export function getWeekDays(currentDate = new Date()) {
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });

  return Array.from({ length: 7 }).map((_, i) => {
    const day = addDays(start, i);
    return {
      date: day,
      num: format(day, "d"),
      label: format(day, "eee"),
      full: format(day, "yyyy-MM-dd"),
    };
  });
}
