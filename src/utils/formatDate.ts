export function FormatDate(date) {
  const locale = "pt-BR";

  const format = Intl.DateTimeFormat(locale, { dateStyle: "short" });

  date = Object(format.format(date));

  return date;
}
