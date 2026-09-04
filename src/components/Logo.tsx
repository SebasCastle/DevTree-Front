import { Link } from "react-router-dom"


export const Logo = () => {
    return (
        <Link to="/"
        className="w-full p-5 lg:p-0 md:w-1/3"
        >
            <img src="/logo.svg" className="block w-full" alt="Logotipo Devtree" />
        </Link>
    )
}
