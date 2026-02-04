import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karan - Full Stack Developer",
  description: "Portfolio of Karan - Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-poppins" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
