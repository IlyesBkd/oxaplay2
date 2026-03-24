const STAR_PATH = "M12 17.27l-5.18 3.05 1.4-5.95L3.5 9.24l6.06-.52L12 3l2.44 5.72 6.06.52-4.72 5.13 1.4 5.95z";

export default function RatingBadge() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-sm font-semibold text-white">4.8</span>
      <span className="inline-flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="inline-flex items-center justify-center w-5 h-5 rounded-[3px] bg-green-500">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="white">
              <path d={STAR_PATH} />
            </svg>
          </span>
        ))}
      </span>
    </span>
  );
}
