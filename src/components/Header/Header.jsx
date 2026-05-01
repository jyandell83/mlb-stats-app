export default function Header() {
  const today = new Date();

  return (
    <h1 className="title">
      MLB Games -{" "}
      {today.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}
    </h1>
  );
}
