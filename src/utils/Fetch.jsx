import { useContext } from 'react'
import useFetch from 'use-http'
import { AuthContext } from '../store/AuthProvider'

const init = localStorage.getItem('token') || ''

const Fetch = () => {
    const { token } = useContext(AuthContext)

    const { get, put, post, del, loading, error } = useFetch(process.env.REACT_APP_API_URI, {
        cachePolicy: 'no-cache',
        headers: {
            token: token || init
        }
    })

    return {
        get,
        put,
        post,
        del,
        loading,
        error
    }
}

export default Fetch
