import { AppState, Auth0Provider, User } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"


type Props = {
    children : React.ReactNode
}

 const Auht0ProviderWithNavigate = ({children}:Props) => {
 const navigate = useNavigate()
 const domain = import.meta.env.VITE_AUTH0_DOMAIN
 const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
 const redirectURL = import.meta.env.VITE_AUTH0_CALLBACK_URL 
 const audience = import.meta.env.VITE_AUTH0_AUDIENCE


 if(!domain || !clientId || !redirectURL || !audience){
    throw new Error("Unable to initialize auth");
 }
const onRedirectCallback = (appState?: AppState, user?:User) => {
   navigate('/auth-callback')
}
 return (
    <Auth0Provider domain = {domain}
        clientId = {clientId}
        authorizationParams={{
             redirect_uri: redirectURL,
             audience,
    }}
    onRedirectCallback={onRedirectCallback}
    cacheLocation="localstorage" // this added by me to keep logged in after refresh
    >
          {children}  
    </Auth0Provider>
 )
}

export default Auht0ProviderWithNavigate