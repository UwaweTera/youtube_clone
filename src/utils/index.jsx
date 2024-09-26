import { formatDistanceToNow } from "date-fns";

export const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

export const formatDate = (date) => {
  const d = new Date(date);
  const month = "" + (d.getMonth() + 1);
  const day = "" + d.getDate();
  const year = d.getFullYear();

  return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
};

export const PostedTime = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    includeSeconds: true,
  }).replace(/^(about|almost|over|under|less than|more than)\s/i, "");
};

export const formatNumber = (num) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
};
