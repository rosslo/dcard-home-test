export const capitalizeFirstLetter = (string) => {
    if (!string) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export function padZero(n) {
  return (n < 10) ? `0${n}` : n;
}

export const dateFormater = (timestamp) => {
  const time = new Date(timestamp);
  const year = time.getFullYear();
  const month = padZero(time.getMonth() + 1);
  const date = padZero(time.getDate());
  const hour = padZero(time.getHours());
  const minute = padZero(time.getMinutes());
  const second = padZero(time.getSeconds());

  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
};