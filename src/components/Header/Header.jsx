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

export default function Header({ text, date }) {
  return (
    <>
      <h1 className="title flex stack-on-mobile">
        <span>{text}</span>
      </h1>
      {date && (
        <h2>
          <span>{formatDisplayDate(date)}</span>
        </h2>
      )}
    </>
  );
}
