const STAR_PATH = "M12 17.27l-5.18 3.05 1.4-5.95L3.5 9.24l6.06-.52L12 3l2.44 5.72 6.06.52-4.72 5.13 1.4 5.95z";

export default function RatingBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-black border-2 border-white/20 rounded-full px-4 py-2 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.15)]">
      <span className="text-sm font-black text-white">4.8</span>
      <span className="h-4 w-px bg-white/20"></span>
      <span className="inline-flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="inline-flex items-center justify-center w-5 h-5 rounded-[3px] bg-green-500">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
              <path d={STAR_PATH} />
            </svg>
          </span>
        ))}
      </span>
    </div>
  );
}
