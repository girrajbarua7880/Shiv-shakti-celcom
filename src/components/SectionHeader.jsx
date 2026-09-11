export default function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow blue">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
      {action}
    </div>
  );
}
