import { createContext, useReducer } from 'react'
import { AXIOS, GET_USER_INFO_URL, LOCAL_STORAGE_KEY } from '../env'


export const AuthContext = createContext()


export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }

        case 'SETPERMS':
            return { ...state, user_permissions: action.payload }

        case 'LOGOUT':
            return {
                user: {
                    isAuthenticated: false,
                    token: null,
                    info: {}
                },
                user_permissions: 0
            }

        default:
            return state
    }
}


export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: {
            isAuthenticated: false,
            token: null,
            info: {}
        },
        user_permissions: 0
    })

    // Check localStorage
    // If the user is logged in, the user's information is stored in the context.
    const user_local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (user_local?.isAuthenticated && state.user.isAuthenticated === false) {
        dispatch({ type: 'LOGIN', payload: user_local })

        // Get user permissions from server
        AXIOS.get(GET_USER_INFO_URL, {
            headers: {
                Authorization: `Bearer ${user_local.token}`
            }
        }).then((response) => {
            dispatch({ type: 'SETPERMS', payload: response.data.user_permissions })
        })
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}