import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate()
  const error = useRouteError() as any;
  console.error({error});
  useEffect(()=>{
    if ([401,403].includes(error.statusCode)) {
      localStorage.removeItem('token')
      setTimeout(()=>{navigate('/auth/login')},1000)
      
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