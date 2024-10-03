'use client'
import React, { useState, useEffect, useContext, createContext } from "react"
import axios from "axios"
const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [autenticado, setAutenticado] = useState(false)
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [mensaje, setMensaje] = useState(null)
    const [error, setError] = useState("");

    const login = async (data) => {
        try {
            const res = await axios.post("api/auth", { data })
            // console.log(res)
            if (res.data.status === 'success') {
                setAutenticado(true)
                setUser(res.data.payload)
                return res.data
            }
            setError("Usuario o Password incorrecto.")
            
        } catch (err) {
            setError("Error al autenticar.")
        }
    }

    const signup = (email, password) => {
        return false
    }

    const logout = async (cb) => {
        // localStorage.removeItem('usertoken')
        const res = await axios.delete("api/auth")
        // console.log(res)
        setAutenticado(false)
        setToken(null)
        setUser(null)
        return cb()
    };
    const sendPasswordResetEmail = (email) => {
        return false
    };
    const confirmPasswordReset = (code, password) => {
        return false
    };

    return {
        user, setUser,
        token,
        autenticado, setAutenticado,
        mensaje,
        error,
        login,
        signup,
        logout,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}