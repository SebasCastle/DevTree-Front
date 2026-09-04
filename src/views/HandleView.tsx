import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getUserByhandle } from "../api/DevTreeApi";
import { HandleData } from "../components/HandleData";

export default function HandleView() {
  const params = useParams();
  const handle = params.handle!

 const { data, isLoading, error } = useQuery({
    queryFn: () => getUserByhandle(handle),
    queryKey: ['handle', handle], 
    retry:1
  });

  if (isLoading) return <div>Cargando usuario...</div>;
  if (error) return <Navigate to={'/404'} />;

  if (data) return (
    <HandleData data={data} />
  )
}
