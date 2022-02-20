import React, { useEffect, useContext } from 'react'
import Image from 'next/image'
import styles from '../styles/Hero.module.css'
import useTrackLocation from '../hooks/use-track-location'
import { getStores } from '../lib/coffee-stores'
import { StoreContext, ACTION_TYPES } from '../pages/_app'

function Hero({ title, subtitle }) {

    const { handleTrackLocation, locationErrMsg, isFindingLocation } = useTrackLocation()

    const handleSearchNearby = () => {
        handleTrackLocation()
    }

    const { dispatch, state } = useContext(StoreContext)

    useEffect(async () => {
        if (state.latLong) {
            try {
                const fetchedStores = await getStores(state.latLong)
                dispatch({
                    type: ACTION_TYPES.SET_COFFEE_STORES,
                    payload: { coffeeStores: fetchedStores }
                })
            } catch (error) {
                console.log({ error })
            }
        }
    }, [state.latLong])

    return (
        <section className={styles.outerContainer}>
            <div className={styles.heroText}>
                <h1 className={styles.title} >{title}</h1>
                <h3 className={styles.subtitle} >{subtitle}</h3>
                <button className={styles.button} onClick={() => handleSearchNearby()}>{isFindingLocation ? "Locating" : "Search Nearby Shops Now"}</button>
                {locationErrMsg && `An Error Getting Location: ${locationErrMsg}`}
            </div>

            <Image src="/static/Coffee-Hero.jpeg" layout='fill' className={styles.heroImage} priority></Image>
        </section >
    )
}

export default Hero