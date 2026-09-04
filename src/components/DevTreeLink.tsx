
import { useSortable } from "@dnd-kit/react/sortable"
import type { SocialLink } from "../types"

type DevTreeLinkProps = {
    link: SocialLink;
    index: number;
}

export const DevTreeLink = ({ link, index }: DevTreeLinkProps) => {

    const sortable = useSortable({
        id: link.id,
        index,
    })

    return (
        <li
            ref={sortable.ref}
            className="w-full list-none"
        >
            <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center w-full gap-5 px-4 py-2 text-white transition-colors duration-200 ease-in-out rounded-lg cursor-pointer bg-cyan-500 hover:bg-cyan-600"
            >
                <div
                    className="w-12 h-12 bg-cover rounded-full"
                    style={{
                        backgroundImage: `url(/social/${link.name}.svg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                <p className="pl-2 capitalize">
                    Visita mi: <strong>{link.name}</strong>
                </p>
            </a>
        </li>
  )
}
