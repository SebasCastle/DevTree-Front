import type { SocialLink, UserHandle } from "../types"

type HandleDataProps = {
    data: UserHandle
}

export const HandleData = ( {data} : HandleDataProps) => {
    const links: SocialLink[] = data.links && data.links !== "undefined" 
        ? JSON.parse(data.links).filter((link: SocialLink) => link.enabled) 
        : [];
        console.log(data)
        console.log(data.description)

  return (
    <div className="space-y-6 text-white ">
        <p className="font-bold text-center text-white ">{data.handle}</p>
        {data.image && <img src={data.image} className="max-w-[250px] mx-auto"/>}
        <p className="text-lg font-bold text-center text-white ">{data.handle}</p>
        <div className="flex flex-col gap-6 mt-20">
            {links.length ? 
            links.map(link => (
            <a 
            key={link.name}
            className="flex items-center gap-5 px-5 py-2 transition-all ease-in-out bg-white rounded-lg hover:scale-105"
            href={link.url}
            target="_blank"
            rel="noreferrer noopener"
            >
                <img  src={`../../public/social/${link.name}.svg`} alt="red social" className="w-12"/>
               <p className="text-lg font-bold text-black capitalize">Visita mi:{link.name}</p> 
            </a>
            ))
             : <p className="text-center text-white">No se encontraron enlaces en este perfil </p>}
        </div>

    </div>
  )
}
