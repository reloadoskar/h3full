import CategoriasContextProvider from "./CategoriasContext";
import MenuContextProvider from "./MenuContext";
import SubcategoriasContextProvider from "./SubcategoriasContext";

export default function layout({ children }) {
    return (
        
            <CategoriasContextProvider>
                <SubcategoriasContextProvider>
                    <div>          
                        {children}
                    </div>
                </SubcategoriasContextProvider>
            </CategoriasContextProvider>
        
    )
}
