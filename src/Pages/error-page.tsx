import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { useAuth } from "../Utils/UseAuth";

export default function ErrorPage() {
  const navigate = useNavigate()
  const error = useRouteError() as any;
  console.error({error});
  const {auth, logout} = useAuth()
  useEffect(()=>{
    if ([401,403].includes(error.statusCode)) {
      
      setTimeout(()=>logout!(),1000)
      
    }
  })

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}