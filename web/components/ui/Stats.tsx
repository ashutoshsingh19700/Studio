type Stat = { num: string; label: string };

export default function Stats({ items, four = false }: { items: Stat[]; four?: boolean }) {
  return (
    <div className={`stats${four ? ' stats--4' : ''}`}>
      {items.map((s) => (
        <div key={s.label} className="stat">
          <p className="stat__num">{s.num}</p>
          <p className="stat__label">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
