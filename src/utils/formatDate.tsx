import { format } from "date-fns";

export const formatDate = (
  validDate: string | undefined,
  type: "gmt" | "day"
) => {
  if (validDate) {
    const date = new Date(validDate);
    if (type === "gmt") {
      return format(date, "do MMMM, HH:mm (z)");
    } else if (type === "day") {
      return format(date, "EEEE, dd MMMM");
    }
  }
  return null;
};
