import React, { useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Hero.module.css'
import useTrackLocation from '../hooks/use-track-location'
import { getStores } from '../lib/coffee-stores'

function Hero({ title, subtitle, handleCoffeeStores }) {

    const { handleTrackLocation, latLong, locationErrMsg, isFindingLocation } = useTrackLocation()

    const handleSearchNearby = () => {
        handleTrackLocation()
    }

    useEffect(async () => {
        if (latLong) {
            try {
                const fetchedStores = await getStores(latLong)
                handleCoffeeStores(fetchedStores, true)
            } catch (error) {
                console.log({ error })
            }
        }
    }, [latLong])

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