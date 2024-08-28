"use client";

import { useAuth } from "@/components/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from '@/images/logob_h_sola_180.svg'
export default function Login() {
  const [newUser, setNewUser] = useState({
    nombre: "",
    telefono: "",
    email: "",
    dbname: "",
    password: "",
  })
  const [theme, setTheme] = useState("")
  const { autenticado, login, error } = useAuth()
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return setTheme("dark")
    }
    return setTheme("light")
  }, [])

  useEffect(() => {
    if (autenticado) {
      router.push('/dashboard')
    }
  }, [autenticado])

  useEffect(() => {
    if (theme === "dark") {
      return document.querySelector("html").classList.add("dark")
    }
    return document.querySelector("html").classList.remove("dark")
  }, [theme])

  const handleChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    login({ email: newUser.email, password: newUser.password }).then(res=>{
      // console.log(res)
      setIsSubmitting(false)
    }).catch(err=>{
      setIsSubmitting(false)
      console.log(err)
    })
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="form">
        <header className="flex justify-between">
          <Image priority={false} alt="logo hadria" src={Logo} width={100} className="aspect-square mx-auto inset-x-0" />
        </header>
        {isSubmitting ?
          <h3 className="mx-auto text-center font-bold text-xl">Conectando...</h3>
          :
          <>
          {!error ? "" : <p className="bg-red-500 text-white p-2 mb-2 text-center">{error}</p>}
            <input
              type="email"
              placeholder="Correo electrónico"
              name="email"
              onChange={handleChange}
              value={newUser.email}
              autoFocus
              required
              className="inputbasico"
            />
            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={newUser.password}
              autoFocus
              className="inputbasico"
            />
            <button type="submit" className="boton text-white font-semibold px-8 py-2 rounded-lg w-full">
              Enviar
            </button>
          </>
        }
      </form>
    </div>
  )
}

