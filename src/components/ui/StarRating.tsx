interface StarRatingProps {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: "sm" | "md";
}

export function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: StarRatingProps) {
  const starSize = size === "sm" ? "text-base" : "text-xl";

  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={[
            starSize,
            "transition-transform",
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
            star <= value ? "text-amber-400" : "text-slate-300",
          ].join(" ")}
        >
          ★
        </button>
      ))}
    </div>
  );
}
