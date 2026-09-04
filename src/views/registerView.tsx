import { useForm } from "react-hook-form";
import {isAxiosError} from 'axios'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ErrorMessage } from "../components/errorMessage";
import type {RegisterForm} from '../types/index'
import api from "../config/axios";


export const LoginRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialValue = {
    name:'',
    mail:'',
    handle:location?.state?.handle || '',
    password:'',
    password_confirmation:''
  }

  const {register, watch, handleSubmit, formState: {errors}} = useForm<RegisterForm>({defaultValues: initialValue})

  const password = watch('password');

  const hanldeRegister = async (formData:RegisterForm ) =>{
    try {
      console.log(import.meta.env.VITE_BACKEND_URL  )
      const {data} = await api.post(`/auth/register`, formData)
      toast.success(data)
      navigate('/auth/login')
    } catch (error) {
      if(isAxiosError(error) && error.response){
        // console.log(error)
        toast.error(error.response.data.error)
      }
      
    }
  }


  return (
    <>
      <h1 className="flex items-center justify-center text-4xl font-bold text-white">
        Crear cuenta
      </h1>
      <form
        onSubmit={handleSubmit(hanldeRegister)}
        className="px-5 py-20 mt-10 space-y-10 bg-white rounded-lg"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register('name',{
              required: "el nombre es obligatorio"
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register('email',{
              required: "el e-mail es obligatorio",
              pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register('handle',{
              required: "el handle es obligatorio"
            })}
          />
          {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register('password',{
              required: "la contraseña es obligatoria",
              minLength:{
                value: 8,
                message: "El Password debe contener 8 caracteres o más"
              }
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Repetir Password"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register('password_confirmation',{
              required: "la contraseña es obligatoria",
              validate: (value) =>value === password || 'Las Passwords no coinciden'
            })}
          />
          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}

        </div>

        <input
          type="submit"
          className="w-full p-3 text-lg font-bold uppercase rounded-lg cursor-pointer bg-cyan-400 text-slate-600"
          value="Crear Cuenta"
        />
      </form>
      <nav className="mt-10 ">
        <Link className="block text-lg text-center text-white" to="/auth/login">
          ¿Ya tienes una cuenta? inicia Sesión
        </Link>
      </nav>
    </>
  );
};
