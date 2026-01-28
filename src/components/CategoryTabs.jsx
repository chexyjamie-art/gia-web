export default function CategoryTabs() {
  return (
    <div className="tabs">
      {["All","Watches","Skincare","Electronics","Shoes"].map(t => (
        <span key={t} className={t==="Watches" ? "active" : ""}>{t}</span>
      ))}
    </div>
  );
}