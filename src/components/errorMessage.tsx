import type React from "react";

export const ErrorMessage = ({children} : {children : React.ReactNode}) => {
return (

        <p className="bg-red-50 text-red-600 p-3 uppercase text-center rounded-md text-sm ">
            <strong>{children}</strong></p>
  );
};