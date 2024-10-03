import { jwtVerify } from "jose";
import Navigation from "./Navigation";
import SettingsContextProvider from "./settings/settingsContext";
import { cookies } from "next/headers";
import ReservasContextProvider from "./reservas/ReservasContext";
import PedidosContextProvider from "./pedidos/PedidosContext";
import StaffContextProvider from "./staff/StaffContext";
import MenuContextProvider from "./menu/MenuContext";
import ProyectoContextProvider from "./proyectos/ContextProyecto";
import { ClientesContextProvider } from "./clientes/ClientesContext";
import PagoContextProvider from "./pagos/ContextPago";
import GastoContextProvider from "./gastos/ContextGasto";
import { UbicacionsContextProvider } from "./ubicaciones/UbicacionsContext";
import HfullContenedor from "./HfullContenedor";


export default async function Layout({ children }) {
  const token = cookies().get('usertoken')?.value
  // console.log(token)

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY))

    return (
      <SettingsContextProvider>
        <ReservasContextProvider>
          <PedidosContextProvider>
            <StaffContextProvider>
              <MenuContextProvider>
                <ProyectoContextProvider>
                  <ClientesContextProvider>
                    <PagoContextProvider>
                      <GastoContextProvider>
                        <UbicacionsContextProvider>
                          <HfullContenedor payload={payload}>
                            {children}
                          </HfullContenedor>
                        </UbicacionsContextProvider>
                      </GastoContextProvider>
                    </PagoContextProvider>
                  </ClientesContextProvider>
                </ProyectoContextProvider>
              </MenuContextProvider>
            </StaffContextProvider>
          </PedidosContextProvider>
        </ReservasContextProvider>
      </SettingsContextProvider>
    )
  } catch (error) {
    console.log(error)
  }
}
