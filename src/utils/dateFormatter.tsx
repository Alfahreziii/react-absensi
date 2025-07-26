import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

export const formatHari = (isoDate: string) => {
  return dayjs(isoDate).format("dddd, D MMMM YYYY");
};

export const formatJam = (jam?: string) => {
  if (!jam) return "Invalid Time";

  const parsed = dayjs(`1970-01-01T${jam}`); // Ini selalu aman
  return parsed.isValid() ? parsed.format("HH:mm") : "Invalid Time";
};