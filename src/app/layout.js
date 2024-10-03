import "./globals.css";
import { Roboto } from "next/font/google"
import { ProvideAuth } from "@/components/AuthContext";

export const metadata = {
  title: "Hadria 3",
  description: "Sistema Hadria, todos los servicios",
  keywords: "tienda, cocina, restaurante, online, ecommerce, sistema, erp, punto de venta"
}

const roboto = Roboto({
  weight: ["300", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"]
})

import moment from 'moment'

moment.locale('es')

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
