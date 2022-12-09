import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../auth/hooks/useAuthContext'
import { useLogin } from '../auth/hooks/useLogin'

function Login() {

    const { user } = useAuthContext()

    const { login, isLoading, error } = useLogin()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.form?.pathname || "/"


    const loginHandler = async () => {
        await login('username', 'password')
        if (!error) {
            navigate(from, { replace: true })
        }
    }

    return (
        user?.isAutenticated
            ? <div>
                <h1>Login</h1>
                <p>
                    <button onClick={loginHandler}>Login</button>
                </p>
                {isLoading && <p>loading...</p>}
            </div>
            : <Navigate to={from} />
    )
}

export default Login