type Props = {
  children: React.ReactNode;
};

export function Timeline({ children }: Props) {
  return (
    <div className="relative pl-8 border-l-2 border-primary/30">
      {children}
    </div>
  );
}

export function TimelineItem({ children }: Props) {
  return (
    <div className="relative mb-12 last:mb-0">
      <div className="absolute -left-[2.55rem] top-1 w-4 h-4 rounded-full bg-primary border-4 border-bg-light" />
      {children}
    </div>
  );
}
