export default function WebTraderPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={`compact-section-ui`}>{children}</main>;
}
