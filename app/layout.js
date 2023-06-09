import './globals.css'

export const metadata = {
  title: '.todolist',
  description: 'Get More Productive',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}