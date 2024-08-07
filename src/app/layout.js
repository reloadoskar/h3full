import "./globals.css";
import { Roboto } from "next/font/google"
import { ProvideAuth } from "@/components/AuthContext";

export const metadata = {
  title: "Hdra - versión full",
  description: "Pagina principal de Hadria Full",
  keywords: "tienda, cocina, restaurante, online, ecommerce"
}

const roboto = Roboto({
  weight: ["300", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"]
})

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <ProvideAuth>
          {children}
        </ProvideAuth>
      </body>
    </html>
  );
}
