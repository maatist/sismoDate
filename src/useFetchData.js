import { useState, useEffect } from "react";

const { getData } = require("./getData");

export const useFetchData = (region, fecha) => {
    const [state, setState] = useState({
        data:[],
        loading: true
    })

    useEffect(() => {
        
        getData(region, fecha)
            .then(sis => {
                setState({
                    data: sis,
                    loading:false
                })
            })

    }, [region, fecha])

    
    return state
}

