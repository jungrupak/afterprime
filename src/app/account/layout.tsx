export default function accountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="trading-layout">
      <div>this is another layout specifically trading and it's pages</div>
      {children}
    </div>
  );
}
