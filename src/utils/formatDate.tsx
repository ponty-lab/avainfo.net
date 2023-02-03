import { format } from "date-fns";

export const formatDate = (date: Date) => {
  if (date) {
    return format(date, "do MMMM, HH:mm (z)");
  }
  return null;
};
