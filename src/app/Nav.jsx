"use client"
import Link from "next/link"
import Image from "next/image"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
export default function Navigation() {
  const [theme, setTheme] = useState("")
  useEffect(()=>{
    if(window.matchMedia("(prefers-color-scheme: dark").matches){
      setTheme("dark")
    }
      setTheme("light")
  },[])
  useEffect(()=>{
    if(theme === "dark"){
      return document.querySelector("html").classList.add("dark")
    }
    return document.querySelector("html").classList.remove("dark")
  },[theme])

  const handleChange = () =>{
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
  }
  return (
    <nav className="contenedor h-20 flex items-center justify-between ">
        <Link href="/" className="w-1/3 max-w-[80px]">
            <img src="/logoHadria3800x800.png" alt="logo hadria" className="dark:invert"/>
        </Link>

        <input type="checkbox" id="menu" className="peer hidden "/>
        <label htmlFor="menu" className="bg-open-menu w-6 h-5 bg-cover bg-center cursor-pointer peer-checked:bg-close-menu transition-all z-50 md:hidden invert dark:invert-0"></label>

        <div className="fixed inset-0 bg-gradient-to-b from-black/40 to-black/90 translate-x-full peer-checked:translate-x-0 transition-transform md:static md:translate-x-0 md:bg-none ">
            <ul className="absolute inset-x-0 top-24 p-12 bg-white/35 w-[90%] mx-auto rounded-md h-max text-center grid gap-4 font-bold md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:static backdrop-blur-sm">
                <li>Precios</li>
                <li><Link href="/blog">Blog</Link></li>
                <li>Contacto</li>
                <li>¿Quienes somos?</li>
                <li>
                  <button onClick={handleChange}>{ theme === "dark" ? 
                      <Sun />
                      : <Moon />  
                      }
                  </button>
                </li>
            </ul>
        </div>

        <Link className="lg:block font-extrabold text-right" href="/login">Log In</Link>
        <Link className="botonlanding hidden lg:block" href="/register">Registro</Link>

    </nav>
  )
}
