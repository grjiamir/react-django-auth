import { LOCAL_STORAGE_KEY } from "../env"
import { useAuthContext } from "./useAuthContext"


export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        // remove the user from local storage
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        // update the auth context
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}