export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head><title>Hello App!</title></head>
      <body>{children}</body>
    </html>
  )
}
