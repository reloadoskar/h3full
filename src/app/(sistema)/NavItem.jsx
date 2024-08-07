import { usePathname } from "next/navigation"

export default function NavItem({ text, linkto, icon, goTo}) {
    const pathname = usePathname()    
    const active = pathname === linkto ? true: false
    return (
        <li >
            <button onClick={()=>goTo(linkto)} className={`
                flex items-center gap-4 w-full
                py-2 px-3 my-1 font-medium 
                cursor-pointer 
                transition-colors group 
                ${active
                    ? "bg-gradient-to-tr from-gray-400 to-gray-200 dark:from-gray-700 dark:to-gray-600 dark:text-gray-100 text-gray-900"
                    : "hover:bg-gray-500 dark:hover:bg-gray-600 dark:text-gray-400 text-gray-950"
                }
            `}>
                {icon}
                <span>{text}</span>
            </button>
        </li>
    )
}
