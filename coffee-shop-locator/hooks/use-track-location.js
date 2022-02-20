import { useContext, useState } from 'react'
import { ACTION_TYPES, StoreContext } from '../store/store-context'

function useTrackLocation() {

    const [locationErrMsg, setLocationErrMsg] = useState('')
    // const [latLong, setLatLong] = useState('')
    const [isFindingLocation, setIsFindingLocation] = useState(false)

    const { dispatch } = useContext(StoreContext)

    const successHandler = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude
        // setLatLong(`${latitude},${longitude}`)
        dispatch({
            type: ACTION_TYPES.SET_LAT_LONG,
            payload: { latLong: `${latitude},${longitude}` }
        })
        setIsFindingLocation(false)
    }

    const errorHandler = () => {
        setLocationErrMsg('Unable to retrieve your location')
        setIsFindingLocation(false)
    }

    const handleTrackLocation = () => {
        setIsFindingLocation(true)
        if (!navigator.geolocation) {
            setLocationErrMsg("Geolocation is not supported by your browser")
            setIsFindingLocation(false)
        } else {
            navigator.geolocation.getCurrentPosition(successHandler, errorHandler)
        }
    }

    return (
        {
            // latLong,
            handleTrackLocation,
            locationErrMsg,
            isFindingLocation
        }
    )
}

export default useTrackLocation