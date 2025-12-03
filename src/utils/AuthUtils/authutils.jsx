const FlagBD = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" aria-hidden>
    <rect width="24" height="16" fill="#006a4e" />
    <circle cx="10" cy="8" r="4.5" fill="#f42a41" />
  </svg>
);
const FlagIN = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" aria-hidden>
    <rect width="24" height="16" fill="#ffffff" />
    <rect width="24" height="5.33" y="0" fill="#ff9933" />
    <rect width="24" height="5.33" y="10.67" fill="#128807" />
    <circle
      cx="12"
      cy="8"
      r="2.1"
      fill="none"
      stroke="#000088"
      strokeWidth="0.7"
    />
    <circle cx="12" cy="8" r="0.4" fill="#000088" />
    {[...Array(24)].map((_, i) => {
      const a = (i * Math.PI * 2) / 24;
      return (
        <line
          key={i}
          x1="12"
          y1="8"
          x2={12 + Math.cos(a) * 2.1}
          y2={8 + Math.sin(a) * 2.1}
          stroke="#000088"
          strokeWidth="0.3"
        />
      );
    })}
  </svg>
);
const FlagPK = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" aria-hidden>
    <rect width="24" height="16" fill="#01411c" />
    <rect width="5" height="16" fill="#fff" />
    <path d="M15 8a4.5 4.5 0 1 1-2.5-4 3.6 3.6 0 1 0 2.5 4z" fill="#fff" />
    <circle cx="15.6" cy="6.2" r="1.1" fill="#fff" />
  </svg>
);

/** --- Country config --- */
export const COUNTRIES = [
  {
    id: "bd",
    name: "Bangladesh",
    dial: "+880",
    maxLocal: 10,
    Flag: FlagBD,
    placeholder: "1XXXXXXXXX",
  },
  {
    id: "pk",
    name: "Pakistan",
    dial: "+92",
    maxLocal: 10,
    Flag: FlagPK,
    placeholder: "3XXXXXXXXX",
  },
  {
    id: "in",
    name: "India",
    dial: "+91",
    maxLocal: 10,
    Flag: FlagIN,
    placeholder: "9XXXXXXXXX",
  },
];