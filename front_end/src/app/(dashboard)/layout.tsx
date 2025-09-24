// Conteúdo para: src/app/(dashboard)/layout.tsx

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Este layout simplesmente passa o conteúdo da página adiante.
  // Ele herda o Header e Footer do RootLayout principal.
  return <>{children}</>;
}