import "./globals.css";

export const metadata = {
  title: "Prototype Civ.IA",
  description: "A prototype of Civ.IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
