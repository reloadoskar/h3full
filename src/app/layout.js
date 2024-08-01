import "./globals.css";

export const metadata = {
  title: "HADRIA FULL APP",
  description: "Aplicación web para negocios",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="">{children}</body>
    </html>
  );
}
