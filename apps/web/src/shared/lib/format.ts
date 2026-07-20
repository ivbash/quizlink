export function formatDate(datetime: Date) {
  const date = [
    ('0' + datetime.getDate()).slice(-2),
    ('0' + (datetime.getMonth() + 1)).slice(-2),
    datetime.getFullYear(),
  ].join('.');

  const time = [
    ('0' + datetime.getHours()).slice(-2),
    ('0' + datetime.getMinutes()).slice(-2),
  ].join(':');

  return `${date} ${time}`;
}
