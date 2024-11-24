import { useAuth0 } from "@auth0/auth0-react"
import { useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import LoadingButton from "./LoadingButton"

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm"
import { useGetMyUser } from "@/api/MyUserApi"

type Props = {
    onCheckout: (UserFormData : UserFormData) => void;
    disabled: boolean;
    isLoading: boolean;
}

const CheckOutButton = ({isLoading, onCheckout,disabled}:Props) => {
    const {isAuthenticated, isLoading: isAuthLoading, loginWithRedirect} = useAuth0()
    const {pathname} = useLocation()

    const {currentUser} = useGetMyUser()

    const onLogin = async ()=> {
        await loginWithRedirect({
            appState:{
                returnTo: pathname
            }
        })
    }

    if(!isAuthenticated){
        return <Button onClick={onLogin} className="bg-orange-500 flex-1">Log in to check out</Button>
    }

    if(isAuthLoading || !currentUser || isLoading){
        return <LoadingButton/>
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button disabled={disabled} className="bg-orange-500 flex-1">
                Go to Checkout
            </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
            <UserProfileForm title="Confirm Delivery Details" buttonText="Continue to payment" currentUser={currentUser} onSave={onCheckout} isLoading={isLoading}/>
        </DialogContent>

    </Dialog>
  )
}

export default CheckOutButton