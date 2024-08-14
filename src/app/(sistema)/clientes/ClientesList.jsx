import { useClientes } from "./ClientesContext";

export default function ClientesList({ clientes }) {
    const { setCliente, setVerCliente } = useClientes()
    const selectCliente = (clnt) => {
        setCliente(clnt)
        setVerCliente(true)
    }
    return (
        <>
            <div className="overflow-auto rounded-lg hidden md:block">
                <table className="w-full ">
                    <thead className="bg-gray-400 dark:bg-gray-950 border-b dark:border-gray-800">
                        <tr>
                            <th className="px-3 text-sm tracking-wide text-left hidden md:table-cell whitespace-nowrap">Nombre</th>
                            <th className="px-3 text-sm tracking-wide text-left hidden md:table-cell whitespace-nowrap">Clave</th>
                            <th className="px-3 text-sm tracking-wide text-left hidden md:table-cell whitespace-nowrap">Referencia</th>
                            <th className="px-3 text-sm tracking-wide text-left hidden md:table-cell whitespace-nowrap">e-mail</th>
                            <th className="px-3 text-sm tracking-wide text-left hidden md:table-cell whitespace-nowrap">Teléfono</th>
                            <th className="px-3 text-sm tracking-wide text-left hidden md:table-cell whitespace-nowrap">Ubicación</th>
                            <th className="px-3 text-sm tracking-wide text-left hidden md:table-cell whitespace-nowrap">Límite de crédito</th>
                            <th className="px-3 text-sm tracking-wide text-left hidden md:table-cell whitespace-nowrap">Crédito disponible</th>
                            <th className="px-3 text-sm tracking-wide text-left hidden md:table-cell whitespace-nowrap">Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes
                            // .filter(cl => cl.clave !== "PEG")
                            .sort((a, b) => a.cuentas.reduce((ttl, cnt) => ttl += cnt.saldo, 0) > b.cuentas.reduce((ttl, cnt) => ttl += cnt.saldo, 0) ? -1 : 1)
                            .map(cliente => (
                                <tr key={cliente._id}
                                    className="odd:bg-gray-300 dark:odd:bg-gray-700 cursor-pointer hover:bg-gray-600 flex md:table-row md:flex-row flex-wrap md:flex-no-wrap py-5 md:mb-0"
                                    onClick={() => selectCliente(cliente)}>
                                    <td className="px-3 w-60 dark:text-gray-300 whitespace-nowrap">
                                        <div className="md:hidden text-xs font-bold text-gray-500">Nombre</div>
                                        {cliente.nombre}
                                    </td>
                                    <td className="px-3 dark:text-gray-300  ">
                                        <div className="md:hidden text-xs font-bold dark:text-gray-500">Clave</div>
                                        {cliente.clave}
                                    </td>
                                    <td className="px-3 dark:text-gray-300 whitespace-nowrap">
                                        <div className="md:hidden text-xs font-bold dark:text-gray-500">Referencia</div>
                                        {cliente.ref}
                                    </td>
                                    <td className="px-3 dark:text-gray-300 ">
                                        <div className="md:hidden text-xs font-bold dark:text-gray-500">email</div>
                                        {cliente.email}
                                    </td>
                                    <td className="px-3 dark:text-gray-300  ">
                                        <div className="md:hidden text-xs font-bold dark:text-gray-500">Teléfono</div>
                                        {cliente.tel1}
                                    </td>
                                    <td className="px-3 dark:text-gray-300  ">
                                        <div className="md:hidden text-xs font-bold dark:text-gray-500">Ubicación</div>
                                        {cliente.ubicacion?.nombre}
                                    </td>
                                    <td className="px-3 dark:text-gray-300 text-right ">
                                        <div className="md:hidden text-xs font-bold dark:text-gray-500">Límite de crédito</div>
                                        {cliente.limite_de_credito}
                                    </td>
                                    <td className="px-3 dark:text-gray-300 text-right ">
                                        <div className="md:hidden text-xs font-bold dark:text-gray-500">Crédito disponible</div>
                                        {cliente.credito_disponible}
                                    </td>
                                    <td className="px-3 dark:text-gray-300 text-right ">
                                        <div className="md:hidden text-xs font-bold dark:text-gray-500">Saldo</div>
                                        {cliente.cuentas.reduce((ttl, cnt) => ttl += cnt.saldo, 0)}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>

            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clientes
                    // .filter(cl => cl.clave !== "PEG")
                    .sort((a, b) => a.cuentas.reduce((ttl, cnt) => ttl += cnt.saldo, 0) > b.cuentas.reduce((ttl, cnt) => ttl += cnt.saldo, 0) ? -1 : 1)
                    .map(cliente => (
                        <div key={cliente._id} className="bg-gray-700 rounded-md p-4 flex gap-4">
                            <div className="basis-1/3">
                                foto
                            </div>

                            <div className="flex flex-col w-full">
                                <div className="font-semibold">
                                    {cliente.nombre} ({cliente.clave})
                                </div>
                                <div className="text-gray-500 text-xs">
                                    {cliente.ref}
                                </div>
                                <div className="">
                                    <a href={"mailto:"+cliente.email}>{cliente.email}</a>
                                </div>
                                <div className="">
                                    <a href={"tel:"+cliente.tel1}>{cliente.tel1}</a>
                                </div>
                                <div className="">
                                    {cliente.ubicacion?.nombre}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="">Límite</div>
                                    <div className="text-right">{cliente.limite_de_credito}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div>Disponible</div>
                                    <div className="text-right">{cliente.credito_disponible}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div>Saldo</div>
                                    <div className="text-right">${cliente.cuentas.reduce((ttl, cnt) => ttl += cnt.saldo, 0)}</div>
                                </div>
                                <div>
                                <button className="boton" onClick={() => selectCliente(cliente)}>Editar</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}
