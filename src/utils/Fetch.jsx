import useFetch from 'use-http'

const Fetch = () => {
    const { get, put, post, del, loading, error } = useFetch(process.env.REACT_APP_API_URI, {
        cachePolicy: 'no-cache'
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
