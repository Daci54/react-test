export function generateDate(dateString: string): Date {
  const [year, month, day]: string[] = dateString.split('-');
  return new Date(+year, +month, +day);
}
