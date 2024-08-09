"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function NewUser() {
  const [newUser, setNewUser] = useState({
    telefono: "",
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);

    await createUser().then(res => {
      setIsSubmitting(false)
    }).catch(err => console.log(err));
  };

  const validate = () => {
    let errors = {};
    if (!newUser.telefono) {
      errors.telefono = "Se requiere número de teléfono";
    }
    if (!newUser.email) {
      errors.email = "Se requiere un correo electrónico valido";
    }
    if (!newUser.password) {
      errors.password = "Se requiere un password";
    }

    return errors;
  };

  const createUser = async () => {
    try {
      const signupResponse = await axios.post("/api/auth/signup", newUser);
      // console.log(signupResponse)
      const res = await signIn("credentials", { email: newUser.email, password: newUser.password, redirect: false })
      // console.log(res)
      if (res?.ok) return router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contenedor min-h-screen flex justify-center items-center">
      {isSubmitting ?
        <div className="text-center text-xs">Enviando...</div>
        :
        <form onSubmit={handleSubmit} className="dark:bg-gray-700 bg-gray-300 p-4 rounded-sm">
          <header className="">
            <h1 className="font-bold text-xl text-center">Registro de Usuario</h1>
          </header>
          {/* <input
          type="text"
          placeholder="Nombre de usuario"
          name="nombre"
          onChange={handleChange}
          value={newUser.nombre}
          autoFocus
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />
        { !errors.nombre ? "" : <p className="text-red-500">{errors.nombre}</p> } */}
          <input
            type="email"
            placeholder="Correo electrónico"
            name="email"
            onChange={handleChange}
            value={newUser.email}
            autoFocus
            className="inputbasico my-4"
          />
          {!errors.email ? "" : <p className="text-red-500">{errors.email}</p>}
          <div className="inputbasico my-4 flex gap-2" >
            <span>+52</span>
            <input
              className="bg-transparent w-full px-4 focus:outline-none"
              type="text"
              placeholder="Teléfono"
              name="telefono"
              onChange={handleChange}
              value={newUser.telefono}
              autoFocus
            />
          </div>
          {!errors.telefono ? "" : <p className="text-red-500">{errors.telefono}</p>}
          <input
            className="inputbasico my-4 flex gap-2"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={newUser.password}
            autoFocus
          />

          {!errors.password ? "" : <p className="text-red-500">{errors.password}</p>}
          <button type="submit" className="boton w-full">
            Registrar
          </button>
        </form>
      }
    </div>
  )
}

