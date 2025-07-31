import dayjs from "dayjs";
const MOURNING_DAYS = ["04-04", "05-12", "07-07", "09-18", "12-13"];

export const isGary = () => {
  const today = dayjs().format("MM-DD");
  return MOURNING_DAYS.includes(today);
};
