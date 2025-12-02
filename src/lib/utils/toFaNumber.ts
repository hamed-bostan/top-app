export default function toFaNumber(number: number) {
  return new Intl.NumberFormat("fa-IR").format(number);
}
