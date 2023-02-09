import { addDays, format } from "date-fns";

export const formatDate = (
  validDate: string | undefined,
  type: "gmt" | "day"
) => {
  if (validDate) {
    const date = new Date(validDate);
    if (type === "gmt") {
      return format(date, "do MMMM, HH:mm (z)");
    } else if (type === "day") {
      return format(addDays(date, 1), "EEEE, do MMMM");
    }
  }
  return null;
};
