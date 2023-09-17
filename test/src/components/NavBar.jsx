
import { Link } from "react-router-dom";


export default function NavBar() {

    return (
        <>
        <nav className="flex items-center justify-end p-5 z-100 bg-slate-800 uppercase">
            
            <a
              className="pl-5 text-white"
            >
              Accueil
            </a>
            <a
              className="pl-5 text-white"
            >
              Nos produits
            </a>
            <a
              
              className="pl-5 text-white"
            >
              A propos
            </a>
            <a className="pl-5 text-white">
                connexion
            </a>
    
        </nav>
        </>
    )
}