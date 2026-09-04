import { Link, Outlet } from "react-router-dom";
import NavigationTabs from "./NavigationTaps";
import { Toaster } from "sonner";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { PointerActivationConstraints, PointerSensor, type DragEndEvent } from "@dnd-kit/dom";
import type { SocialLink, User } from "../types";
import { useEffect, useState } from "react";
import { DevTreeLink } from "./DevTreeLink";
import { useQueryClient } from "@tanstack/react-query";
import { Header } from "./Header";

type DevTreeprops = {
    data: User
}

export const DevTree = ({data}: DevTreeprops) => {
    const [enabledLinks, setEnabledLinks] = useState<SocialLink[]>(JSON.parse(data.links).filter((link: SocialLink) => link.enabled));
    
    useEffect(()=>{
        setEnabledLinks(JSON.parse(data.links).filter((link: SocialLink) => link.enabled))
    },[data])



    const queryClient = useQueryClient()
//funcion para el manego del drag and drop
const handleDragEnd = (e: DragEndEvent) => {

    if (e.canceled) return;

    const order = move(enabledLinks, e);
    setEnabledLinks(order);

    const disabledLinks: SocialLink[]  = JSON.parse(data.links).filter((link: SocialLink) => !link.enabled)

    const links = order.concat(disabledLinks)
    queryClient.setQueryData(['user'], (prevData: User) =>{
        return{
            ...prevData,
            links: JSON.stringify(links)
        }
    })

};



  return (
    <>
    <Header/>
            <div className="min-h-screen py-10 bg-gray-100">
                <main className="max-w-5xl p-10 mx-auto md:p-0">
                    <NavigationTabs/>
                    
                    <div className="flex justify-end">
                        <Link 
                            className="text-2xl font-bold text-right text-slate-800"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil: /{data.handle}</Link>
                    </div>

                    <div className="flex flex-col gap-10 mt-10 md:flex-row">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full px-5 py-10 space-y-6 md:w-96 bg-slate-800">
                            <p className="text-xl font-bold text-center text-white">{data.handle}</p>
                            {data.image && <img src={data.image} alt={data.handle} className="w-full h-auto rounded-lg" />}
                            <p className="text-center text-white">{data.description}</p>

                            {/* Enlaces habilitados */}
                            <DragDropProvider onDragEnd={handleDragEnd} 
                                sensors={(defaults) => [
                                    ...defaults.filter(sensor => sensor !== PointerSensor),
                                    PointerSensor.configure({
                                        preventActivation: () => false,
                                        activationConstraints: [
                                            new PointerActivationConstraints.Distance({
                                                value: 5
                                            })
                                        ]
                                    })
                                ]}
                                >
                                <div className="flex flex-col gap-5 mt-20 text-center">
                                    {enabledLinks.map((link: SocialLink, index: number) => (
                                        <DevTreeLink key={link.name} link={link} index={index} />
                                    ))}
                                </div>
                            </DragDropProvider>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
  );
};

