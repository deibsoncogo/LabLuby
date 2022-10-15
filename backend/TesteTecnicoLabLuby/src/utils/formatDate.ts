export function FormatDate(date: Date) {
  const locale = "pt-BR";

  const format = Intl.DateTimeFormat(locale, { dateStyle: "short" });

  date = Object(format.format(date));

  return date;
}
