import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Integra Formation BAE Şirket Kuruluş Anketi',
  description: 'BAE şirket kuruluş süreci için detaylı anket formu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
