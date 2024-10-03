'use client'
import { createContext, useState, useCallback, useContext, useEffect } from "react"
import axios from "axios"

export const SettingsContext = createContext()

export const useSettings = () => {
    return useContext(SettingsContext)
}

export const SettingsContextProvider = (props) => {
    const [settings, setSettings] = useState(null) 
           
    const loadSettings = useCallback(async (database) => { 
        if(database){
            const response = await axios.post("/api/settings/load",{database:database})            
            setSettings(response.data.settings[0])
            return response;
        }
    }, [])

    const createSettings = async (database, data) => {
        const res = await axios.post("/api/settings/", { database, data })
        setSettings(res.data.settings)
        return res
    }

    const updateSettings = async (database, data) => {
        const res = await axios.put("/api/settings/", {database, data })
        setSettings(res.data.settings)
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