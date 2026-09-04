import { useLocation } from "react-router-dom"
import { AdminNavigation } from "./Nav/AdminNavigation"
import { HomeNavigation } from "./Nav/HomeNavigation";
import { Logo } from "./Logo";


export const Header = () => {
    
    const location =useLocation();

  return (
    <header className="py-5 bg-slate-800">
        <div className="flex flex-col items-center max-w-5xl mx-auto md:flex-row md:justify-between">
            <Logo />
            <div className="md:w-1/3 md:flex md:justify-end">
            {location.pathname === "/Home" ? <HomeNavigation/> : <AdminNavigation/>}
            </div>
        </div>
    </header>
  )
}
