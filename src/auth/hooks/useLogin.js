import { useState } from "react"
import { AXIOS, CLIENT_ID, CLIENT_SECRET, GET_USER_INFO_URL, LOCAL_STORAGE_KEY, LOGIN_URL } from "../env"
import { useAuthContext } from "./useAuthContext"


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        const response = await AXIOS.post(LOGIN_URL, {
            grant_type: 'password',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            username: username,
            password: password
        })

        if (response.status === 200 && 'access_token' in response.data) {
            const response_user_info = await AXIOS.get(GET_USER_INFO_URL, {
                headers: {
                    Authorization: `Bearer ${response.data.access_token}`
                }
            })
            if (response_user_info.status === 200) {
                var user_info = response_user_info.data.info
                var user_permissions = response_user_info.data.user_permissions
            }
            else {
                user_info = {}
                user_permissions = []
            }

            const user = {
                isAuthenticated: true,
                token: response.data.access_token,
                info: user_info
            }

            // save the user to local storage
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: user })
            dispatch({ type: 'SETPERMS', payload: user_permissions })

            setIsLoading(false)
        }
        else {
            setIsLoading(false)
            setError(response)
        }
    }

    return { login, isLoading, error }
}