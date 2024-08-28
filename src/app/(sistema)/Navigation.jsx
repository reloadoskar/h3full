'use client'
import { FolderTree, CalendarRange, Users, Clipboard, MenuSquare, LayoutDashboard, Menu, ShoppingBag, ClipboardList, X, Store, TableProperties, Warehouse, MoreVertical, Settings, Moon, Sun, Users2, HousePlus, LucideUsers } from "lucide-react";
import NavItem from "./NavItem";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import avatar from '@/images/avatarH5.png'
import { useAuth } from '@/components/AuthContext'
import { useSettings } from "./settings/settingsContext";
import Switch from "@/components/Switch";

export default function Navigation({payload}) {
	const { user, autenticado, setUser, setAutenticado, logout } = useAuth()	
	const [theme, setTheme] = useState("")
	const {settings, loadSettings } = useSettings()
	
	const ref = useRef(null)
	const router = useRouter()
	const [expanded, setExpanded] = useState(true)
	const goTo = (here) => {
		router.push(here);
		setExpanded(false)
	}

	useEffect(() => {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return setTheme("dark")
		}
		return setTheme("light")		
	}, [])

	useEffect(()=>{
		if(payload){
			setUser(payload)
			setAutenticado(true)
		}
	},[payload])

	useEffect(() => {
		if (theme === "dark") {
			return document.querySelector("html").classList.add("dark")
		}
		return document.querySelector("html").classList.remove("dark")
	}, [theme])

	const handleChange = () => {
		setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
	}

	useEffect(() => {
		if (autenticado) {
			// console.log(user)
			
			loadSettings(user.database).then(res => {
				
			})
		}
	}, [user, autenticado])

	// useEffect(() => {
	// }, [session])

	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (!ref.current?.contains(e.target)) {
				setExpanded(false)
			}
		}
		window.addEventListener("mousedown", handleOutsideClick)

		return () => {
			window.removeEventListener("mousedown", handleOutsideClick)
		}
	}, [ref])

	const handleLogOut = () =>{
		logout(()=>{
			router.push("/login")
		})
	}
	return (
		<div className="flex flex-col" ref={ref}>
			<div className={`fixed md:w-1/4 w-[90%] inset-0 bg-gradient-to-b  flex flex-col from-white/95 to-white/80
                dark:from-black/95 dark:to-black/80 
                ${expanded ? "translate-x-0" : "-translate-x-full"}
                transition-transform 
                duration-500 ease-in-out `}>
				<div className="w-6 h-6 absolute -right-6">
					<button className="" onClick={() => setExpanded(!expanded)}>
						{expanded ? <X /> : <Menu />}
					</button>
				</div>

				<div className="w-full py-10">
					<h1 className="text-2xl font-bold text-center">H A D R I A 3</h1>
				</div>
				<div className="px-3 py-2 flex gap-2">
					{theme === "dark" ? <Moon /> : <Sun />} <Switch label="darkmode" value={theme === "dark" ? true : false} action={handleChange} />
				</div>
				<div className="flex-1 overflow-y-auto">
					<nav>
						<ul className="flex flex-col gap-2 ">
							{ user?.level === 0 ? <NavItem goTo={goTo} icon={<Settings />} text="Configuración" linkto="/settings" /> : null }
							{ settings?.secciones?.find(sec=>sec==="dashboard") ? <NavItem goTo={goTo} icon={<LayoutDashboard />} text="Dashboard" linkto="/dashboard" /> : null }
							{ settings?.secciones?.find(sec=>sec==="menu") ? <NavItem goTo={goTo} icon={<MenuSquare />} text="Menú" linkto="/menu" /> : null }
							{ settings?.secciones?.find(sec=>sec==="reservas") ? <NavItem goTo={goTo} icon={<CalendarRange />} text="Reservaciones" linkto="/reservas" /> : null }
							{ settings?.secciones?.find(sec=>sec==="pedidos") ? <NavItem goTo={goTo} icon={<Clipboard />} text="Pedidos" linkto="/pedidos" /> : null }
							{ settings?.secciones?.find(sec=>sec==="staff") ? <NavItem goTo={goTo} icon={<Users />} text="Staff" linkto="/staff" /> : null }
							{ settings?.secciones?.find(sec=>sec==="proyectos") ? <NavItem goTo={goTo} icon={<HousePlus />} text="Proyectos" linkto="/proyectos" /> : null }
							{ settings?.secciones?.find(sec=>sec==="clientes") ? <NavItem goTo={goTo} icon={<LucideUsers />} text="Clientes" linkto="/clientes" /> : null }
							{ settings?.secciones?.find(sec=>sec==="empleados") ? <NavItem goTo={goTo} icon={<Users2 />} text="Empleados" linkto="/empleados" /> : null }
							{ settings?.secciones?.find(sec=>sec==="productores") ? <NavItem goTo={goTo} icon={<Users2 />} text="Productores" linkto="/productores" /> : null }
							{ settings?.secciones?.find(sec=>sec==="productos") ? <NavItem goTo={goTo} icon={<Users2 />} text="Productos" linkto="/productos" /> : null }
							{ settings?.secciones?.find(sec=>sec==="ubicaciones") ? <NavItem goTo={goTo} icon={<Users2 />} text="Ubicaciones" linkto="/ubicaciones" /> : null }
							{ settings?.secciones?.find(sec=>sec==="compras") ? <NavItem goTo={goTo} icon={<Warehouse />} text="Compras" linkto="/compras" /> : null }
							{ settings?.secciones?.find(sec=>sec==="inventario") ? <NavItem goTo={goTo} icon={<TableProperties />} text="Inventario" linkto="/inventario" /> : null }
							{ settings?.secciones?.find(sec=>sec==="ventas") ? <NavItem goTo={goTo} icon={<ShoppingBag />} text="Ventas" linkto="/ventas" /> : null }
							{ settings?.secciones?.find(sec=>sec==="pdv") ? <NavItem goTo={goTo} icon={<Store />} text="Punto de venta" linkto="/pdv" /> : null }
							<li>
								<button onClick={()=>handleLogOut()}>Salir</button>
							</li>
						</ul>						
					</nav>
				</div>
				<div className='border-t flex p-3'>
					<Image src={avatar} alt="avatar" width={50} />
					<div className={`
                    flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                `}>
						<div className='leading-4'>
							<h4 className='font-semibold'>{!user ? "" : user.nombre}</h4>
							<span className='text-xs text-gray-500'>{!user ? "" : user.email}</span>
						</div>
						<button><MoreVertical size={20} /></button>
					</div>
				</div>
			</div>
		</div>
	)
}
