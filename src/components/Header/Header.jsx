const formatDisplayDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");

  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function Header({ date }) {
  return <h1 className="title">MLB Games - {formatDisplayDate(date)}</h1>;
}
