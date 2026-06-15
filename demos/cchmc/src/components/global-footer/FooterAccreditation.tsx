const accreditationItems = [
  "Best Children's Hospitals Honor Roll",
  'Best Places to Work',
  "Forbes America's Best Midsize Employers",
];

export const FooterAccreditation = () => (
  <div className="hidden @lg:flex max-w-md flex-col gap-2 text-right">
    {accreditationItems.map((item) => (
      <span
        key={item}
        className="text-muted-foreground text-xs leading-snug font-semibold uppercase tracking-wide"
      >
        {item}
      </span>
    ))}
  </div>
);
