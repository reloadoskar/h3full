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


export default async function Layout({ children }) {
  const token = cookies().get('usertoken')?.value
  // console.log(token)

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY))
    return (
      <div className="flex flex-col" >
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
                            <Navigation payload={payload} />
                            <div className="pl-12 pr-6">
                              {children}
                            </div>
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
      </div>
    )
  } catch (error) {
    console.log(error)
  }
}
