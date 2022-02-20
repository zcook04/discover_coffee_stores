import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'

import styles from '../../styles/Coffee-store.module.css'
import { getStores } from '../../lib/coffee-stores'
import { StoreContext } from '../_app'
import { isEmpty } from '../../utils'

export async function getStaticProps({ params }) {
    const stores = await getStores()

    const findCoffeeStoreById = stores.find((store) => {
        return store.id.toString() === params.id;
    });
    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
        }
    }
}

export async function getStaticPaths() {
    const stores = await getStores()
    const paths = stores.map(store => {
        return {
            params: {
                id: store.id.toString()
            }
        }
    })

    return {
        paths,
        fallback: true
    }
}

function CoffeeStore(initialProps) {
    const router = useRouter()
    const id = router.query.id

    const [coffeeStore, setCoffeeStore] = useState(
        initialProps.coffeeStore || {}
    );

    const {
        state: { coffeeStores },
    } = useContext(StoreContext);

    const [name, setName] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [formattedAddress, setFormattedAddress] = useState('')

    useEffect(() => {
        if (isEmpty(initialProps.coffeeStore)) {
            if (coffeeStores.length > 0) {
                const findCoffeeStoreById = coffeeStores.find((store) => {
                    return store.id.toString() === id;
                })
                setCoffeeStore(findCoffeeStoreById)
            }
        }
    }, [id])

    useEffect(() => {
        setName(coffeeStore.name)
        setImgUrl(coffeeStore.imgUrl)
        if (coffeeStore.location) {
            setFormattedAddress(coffeeStore.location.formatted_address)
        }

    }, [coffeeStore])
    // const { name, imgUrl, location: { formatted_address } } = coffeeStore
    const [upvotes, setUpvotes] = useState(1)

    if (router.isFallback) {
        return <div>Loading content, please wait.</div>
    }



    return (
        <>
            <Head><title>{name}</title></Head>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.image}><Image src={imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'} alt={name || 'loading'} layout='fill' priority /></div>
                </div>
                <div className={styles.rightSide}>
                    <Link href="/" ><a className={styles.link}><Image className={styles.thumbup} src="/static/icons/arrow-back.svg" width={25} height={25} />Return Home</a></Link>
                    <h2 className={styles.h2}>{name || 'loading'}</h2>
                    <p className={styles.address}>{formattedAddress || 'loading'}</p>
                    <div className={styles.upvoteContainer}>
                        <div className={styles.upvotes}>{upvotes || 'loading'} People upvoted this cafe!</div>
                        <div className={styles.upvoteButtonContainer}><button className={styles.upvoteButton} onClick={() => setUpvotes(upvotes++)}>Upvote</button><Image className={styles.thumbup} src="/static/icons/thumbup.svg" width={25} height={25} /></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CoffeeStore