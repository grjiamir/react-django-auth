import React from 'react'
import { useAuthContext } from '../auth/hooks/useAuthContext'

function Home() {

    const { user } = useAuthContext()

    return (
        <div>
            <h1>Home</h1>
            <p>{user.info.phone}</p>
        </div>
    )
}

export default Home