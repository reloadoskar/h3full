import { UbicacionsContextProvider } from "./UbicacionsContext";

export default function layout({ children }) {
    return (
        <main className="w-full">
            <UbicacionsContextProvider>
                {children}
            </UbicacionsContextProvider>
        </main>
    )
}