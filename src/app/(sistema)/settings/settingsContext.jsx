'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"

export const SettingsContext = createContext()

export const useSettings = () => {
    return useContext(SettingsContext)
}
export const SettingsContextProvider = (props) => {
    const [settings, setSettings] = useState(null) 
            
    // La función fetch que se memoriza con useCallback 
    const loadSettings = useCallback(async (database) => { 
        if(database){
            const response = await fetch("/api/settings/load",{
                method: 'POST',
                body: JSON.stringify({database:database})
            })
            const data = await response.json()
            setSettings(data.settings[0])
            return data; 
        }
    }, [])

    const createSettings = async (database, data) => {
        const res = await fetch("/api/settings/", {
            method: 'POST',
            body: JSON.stringify({ database, data })
        })
        // console.log(res.data)
        // setSettings(res.data.settings)
        return res
    }
    const updateSettings = async (database, data) => {
        const res = await fetch("/api/settings/", {
            method: 'PUT',
            body: JSON.stringify({ database, data })
        })
        setSettings(data)
        return res
    }
    return(
        <SettingsContext.Provider value={{
            settings, setSettings,
            createSettings,
            loadSettings, updateSettings
        }}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider