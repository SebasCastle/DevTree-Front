import { useForm } from "react-hook-form"
import { ErrorMessage } from "../components/errorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { ProfileForm, User } from "../types";
import { updateUser, uploadImage } from "../api/DevTreeApi";
import { toast } from "sonner";


export default function ProfileView() {

    const queryClient = useQueryClient()
    const data: User = queryClient.getQueryData(['user'])!

        const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<ProfileForm>({defaultValues : {
            handle : data.handle,
            description: data.description
        }});

        const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
            if(e.target.files){
                uploadImg.mutate(e.target.files[0])
            }
        }
        //     const file = e.target.files?.[0]
        //     if(file){
        //         const formData = new FormData()
        //         formData.append('file', file)
        // const handlerChange = () =>{
        //     console.log('cambio de imagen')
        // }

        const updateProfile = useMutation({
            mutationFn: updateUser,
            onError: (error) =>{
                toast.error(error.message)
            },
            onSuccess: (data) =>{
                toast.success(data)
                queryClient.invalidateQueries({queryKey: ['user']})
            }

        })

        const uploadImg = useMutation({
            mutationFn: uploadImage,
            onError: (error) =>{
                toast.error(error.message)
            },
            onSuccess: (data) =>{
                queryClient.setQueryData(['user'], (oldData: User) => {
                    return {
                        ...oldData,
                        image: data
                    }
                }) //optimistic query update
            }

        })

        const handleUserProfileForm =  (formData: ProfileForm) =>{
            const user : User = queryClient.getQueryData(['user'])!
            user.description = formData.description
            user.handle = formData.handle
            console.log(formData)
            updateProfile.mutate(user)
        }

    return (
        <form 
            className="p-10 space-y-5 bg-white rounded-lg"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-center text-slate-800">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    id="handle"
                    className="p-2 border-none rounded-lg bg-slate-100"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle',{
                        required: "El nombre de usuario es obligatorio"
                    })}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    id="description"
                    className="p-2 border-none rounded-lg bg-slate-100"
                    placeholder="Tu Descripción"
                    {...register('description')}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    title="handle"
                    id="image"
                    type="file"
                    name="handle"
                    className="p-2 border-none rounded-lg bg-slate-100"
                    accept="image/*"
                    onChange={ handlerChange }
                />
            </div>

            <input
                type="submit"
                className="w-full p-2 text-lg font-bold uppercase rounded-lg cursor-pointer bg-cyan-400 text-slate-600"
                value='Guardar Cambios'
            />
        </form>
    )
}