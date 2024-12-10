import "./globals.css";

export const metadata = {
  title: "Prototype Civ.IA",
  description: "A prototype of Civ.IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel="icon" href="/civision_browser_img.png" />
        {/* <title>Civ.IA</title> */}
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
