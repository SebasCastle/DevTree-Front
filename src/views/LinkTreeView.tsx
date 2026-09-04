/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-render */
import { toast } from "sonner";
import { isValidUrl } from "../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { social } from "../data/social";
import { DevTreeInput } from "../components/DevTreeInput";
import { updateUser } from "../api/DevTreeApi";
import type { SocialLink, User } from "../types";


export default function  LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient()
  const user : User = queryClient.getQueryData(['user'])!
  
  const {mutate} = useMutation({
    mutationFn: updateUser,
    onError: (error) =>{
      toast.error(error.message)
    },
    onSuccess: () =>{
      toast.success('Perfil actualizado correctamente')
    }
  })

  //cargar los datos del usuario al habilitar esta ventana o al guardar los datos
  useEffect(() =>{
        const updateData = devTreeLinks.map(item =>{
        const userLink = JSON.parse(user.links).find((link: SocialLink) => link.name === item.name)
        if (userLink){
          return {...item, url: userLink.url, enabled:userLink.enabled}
        }
        return item
      })
      setDevTreeLinks(updateData)
      }
    ,[user])

  //acualizar el URL
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateLinks = devTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link);
    setDevTreeLinks(updateLinks);

  }




  //esta funcion se ejecuta al cambiar el switch
  
  //funcion para habilitar los links
  const handleEnableLink = (socialName: string) => {
    const currentUser = queryClient.getQueryData<User>(["user"]);

    if (!currentUser) return;

    const currentLinks: SocialLink[] = JSON.parse(currentUser.links);
    const selectedLink = devTreeLinks.find( link => link.name === socialName );

    if (!selectedLink) return;

    if (!isValidUrl(selectedLink.url)) {
        toast.error("URL no válido");
        return;
    }

    const newEnabled = !selectedLink.enabled;
    // Actualizar el estado visual de los switches
    const updatedDevTreeLinks = devTreeLinks.map(link =>
        link.name === socialName
            ? {
                ...link,
                enabled: newEnabled
            }
            : link
    );

    setDevTreeLinks(updatedDevTreeLinks);
    // ¿La red ya existe en la lista?
    const existingLink = currentLinks.find( link => link.name === socialName );

    let updatedLinks: SocialLink[];
    if (existingLink) {

        // Ya existe → solamente cambiamos enabled
        updatedLinks = currentLinks.map(link =>
            link.name === socialName
                ? {
                    ...link,
                    url: selectedLink.url,
                    enabled: newEnabled
                }
                : link
        );

    } else {

        // Nunca había sido agregada → crear ID nuevo
        const maxId = currentLinks.reduce(
            (max, link) => Math.max(max, link.id),
            0
        );

        const newLink: SocialLink = {
            ...selectedLink,
            enabled: true,
            id: maxId + 1
        };

        updatedLinks = [
            ...currentLinks,
            newLink
        ];
    }

    // const getUrls: SocialLink[] = updatedLinks.filter(Links => Links.url != '');
    // console.log('Urls:',getUrls)
    // updatedLinks.concat(getUrls);

    console.log("Links finales:", updatedLinks);

    queryClient.setQueryData(["user"],(prevData: User | undefined) => {
            if (!prevData) return prevData;
            return {
                ...prevData,
                links: JSON.stringify(updatedLinks)
            };
        }
    );
};

  return (
    <>
      <div className='space-y-5'>
        {devTreeLinks.map(item =>(
          <DevTreeInput 
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
          />
        ))}
        <button className="w-full p-2 text-lg font-bold uppercase rounded bg-cyan-400 text-slate-950"
        onClick={() => mutate(queryClient.getQueryData(['user'])!)}> Guardar cambios</button>
      </div>
    </>
  );
};
