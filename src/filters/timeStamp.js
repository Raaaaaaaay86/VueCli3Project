export default function (timeStamp) {
  const ts = new Date(timeStamp * 1000);
  const yyyy = ts.getFullYear();
  const mm = ts.getMonth();
  const dd = ts.getDate();

  if (typeof timeStamp === 'string') {
    return timeStamp;
  }
  return `${yyyy}-${mm + 1}-${dd}`;
}
