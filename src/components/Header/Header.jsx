export default function Header({ text }) {
  return (
    <h1 className="title flex stack-on-mobile">
      <span>{text}</span>
    </h1>
  );
}
