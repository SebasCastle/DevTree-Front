import { Link } from "react-router-dom"


export const HomeNavigation = () => {
  return (
    <>
      <Link className="p-2 text-xs font-black text-white uppercase cursor-pointer" 
      to="/auth/login"
      >Iniciar Sesión</Link>
      <Link className="p-2 text-xs font-black text-white uppercase rounded-lg cursor-pointer bg-lime-500" 
      to="/auth/register"
      >Registrarse</Link>
    </>
  )
}
