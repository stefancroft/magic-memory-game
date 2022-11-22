import { useState, useEffect, useRef }  from 'react'

export const useFetch = (url, _options) => {
    const [data, setData] = useState(null) 
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    // use UseRef to wrap an object/array aregument
    // which is a useEffect dependency
    const options = useRef(_options).current

    useEffect(() => {
        console.log(options)
        const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true)

            // Try and catch is only used to log out a specific error in a 
            // place where something specific is happening

            try {
                const res = await fetch(url, { signal: controller.signal })

                if(!res.ok){
                    throw new Error(res.statusText)
                }
                const json = await res.json()
    
                setIsPending(false)
                setData(json)
                setError(null)
            } catch (err) {
                if (err.name ==="AbordError"){
                    console.log("fetch aborted")
                }else {
                    setIsPending(false)
                    setError('Could not fetch the data')
                    console.log(err.message)
                }
            }
        }

        fetchData()

        return () => {
            controller.abort()
        }
    }, [url, options])
 
    return { data, isPending, error  }

}
