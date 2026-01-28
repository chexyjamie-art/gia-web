import logo from "../assets/logo/gia-logo.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="left">☰ Menu</div>
      <img src={logo} alt="GIA Logo" className="logo" />
      <div className="right">🔔 👤</div>
    </header>
  );
}