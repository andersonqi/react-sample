import moment from "moment";

export const parseDate = (date: string, format: string) => {
  return moment(date).format(format);
};

export const parseUnix = (date: number, format: string) => {
  return moment.unix(date).format(format);
};

export const parseTime = (date: string, format: string) => {
  return moment(date, format).format(format);
};
