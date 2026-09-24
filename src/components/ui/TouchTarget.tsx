export default function TouchTarget({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer"
    >
      {children}
    </div>
  );
}
