import { useForm } from "react-hook-form"
import slugify from "react-slugify"
import { useMutation } from "@tanstack/react-query"
import { searchByHandle } from "../api/DevTreeApi"
import { Link } from "react-router-dom"



export const SearchForm = () => {

    const { register, handleSubmit, watch } = useForm({
        defaultValues:{
            handle: ""
        }
    })

    const mutation = useMutation({
        mutationFn: searchByHandle,
        }
    )

    const handle = watch('handle')

    const SearchUser = () => {
        const slug = slugify(handle)
        mutation.mutate(slug)
    }

    return (
        <form
            onSubmit={handleSubmit(SearchUser)}
            className="w-1/2 p-3 m-auto lg:m-0 max-[425px]:m-0">
            <div className="relative flex items-center px-2 mt-10 bg-white ">
                <label
                    htmlFor="handle"
                >devtree.com/</label>
                <input
                    type="text"
                    id="handle"
                    className="flex-1 p-2 bg-transparent border-none focus:ring-0"
                    placeholder="elonmusk, zuck, jeffbezos"
                    {...register("handle", {
                        required: "Un Nombre de Usuario es obligatorio",
                    })}
                />

            </div>
            <div className="m-5 backdrop:blur-sm">
                {mutation.isPending && <p className="text-center">Cargando...</p>}
                {mutation.error && <p className="font-black text-center text-red-600">{mutation.error.message}</p>}
                {mutation.data && <p className="font-black text-center text-cyan-600">{mutation.data} ir a <Link to={`/auth/register`} state={{ handle: slugify(handle) }}>Registrar</Link></p>}

            </div>

            <input
                type="submit"
                className="w-full p-3 text-lg font-bold uppercase rounded-lg cursor-pointer bg-cyan-400 text-slate-600 max-[485px]:text-sm"
                value='Obtener mi DevTree'
            />
        </form>
    )
}
