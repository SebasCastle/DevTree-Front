import React from 'react'
import { Header } from '../components/Header'
import { SearchForm } from '../components/SearchForm'

export const HomeView = () => {
  return (
    <>
      <Header/>
      <main className ="min-h-screen py-10 bg-gray-100 bg-right-top bg-no-repeat lg:bg-home">
        <div className = "max-w-5xl mx-auto mt-10">
          <div className = "px-10 space-y-6 lg:w-1/2 lg:p-0">
          <h1 className = "text-3xl font-bold text-gray-800">
            Todas tus <span className ="text-green-400"> Redes sociales </span>
            en un enlace
          </h1>
          <p className = "text-xl text-slate-800">
            Únete a más de 200 mil usuarios que ya están usando DevTree para compartir sus redes sociales y contenido en un solo lugar.
          </p>
          </div>
          <SearchForm />
        </div>
      </main>
    </>
  )
}
