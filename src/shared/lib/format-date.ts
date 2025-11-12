export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  date.setHours(date.getHours() + 3);

  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
