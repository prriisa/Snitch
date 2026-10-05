export default function ColorSelector({ colors, selected }) {
  return (
    <div className="mx-4 md:mx-0 mt-4 mb-3">
      <p className="mb-2 text-xs md:text-sm"><span className="font-light">Selected Color</span> · {colors[selected].name}</p>
      <div className="flex gap-1.5 overflow-x-auto">
        {colors.map((c, i) => (
          <img
            key={c.name}
            src={c.image}
            alt={c.name}
            className={`h-20 w-[50px] shrink-0 object-cover ${i === selected ? "border border-black" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}