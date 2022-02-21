import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'

import styles from '../../styles/Coffee-store.module.css'
import { getStores } from '../../lib/coffee-stores'
import { StoreContext } from '../../store/store-context'
import { isEmpty } from '../../utils'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

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

    const handleCreateCoffeeStore = async (store) => {
        try {
            const response = await fetch('/api/createCoffeeStore', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: store.name,
                    voting: 0,
                    imgUrl: store.imgUrl,
                    address: store.location.formatted_address || "",
                    id: store.id
                })
            })
        } catch (err) {
            console.error('Error creating coffee store', err)
        }
    }

    useEffect(() => {
        if (isEmpty(initialProps.coffeeStore)) {
            if (coffeeStores.length > 0) {
                const coffeeStoreFromContext = coffeeStores.find((store) => {
                    return store.id.toString() === id;
                })
                if (coffeeStoreFromContext) {
                    setCoffeeStore(coffeeStoreFromContext)
                    handleCreateCoffeeStore(coffeeStoreFromContext)
                }
            }
        } else {
            handleCreateCoffeeStore(initialProps.coffeeStore)
        }
    }, [id, initialProps])

    useEffect(() => {
        setName(coffeeStore.name)
        setImgUrl(coffeeStore.imgUrl)
        if (coffeeStore.location) {
            setFormattedAddress(coffeeStore.location.formatted_address)
        }

    }, [coffeeStore])
    const [upvotes, setUpvotes] = useState('')

    const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${coffeeStore.id}`, fetcher)

    useEffect(() => {
        if (data && data.length > 0) {
            setCoffeeStore(data[0])
            setUpvotes(data[0].voting)
        }
    }, [data])

    if (error) {
        return <div>Something went wrong retrieving the coffee store.</div>
    }

    if (router.isFallback) {
        return <div>Loading content, please wait.</div>
    }

    const handleUpvote = async () => {
        const coffeeStoreFromContext = coffeeStores.find((store) => {
            return store.id.toString() === id;
        })
        try {
            const response = await fetch('/api/favoriteCoffeeStoreById', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: coffeeStoreFromContext.id
                })
            })
            if (response)
                setUpvotes(upvotes + 1)
        } catch (err) {
            console.error('Error creating coffee store', err)
        }
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
                        <div className={styles.upvotes}>{upvotes || 0} People upvoted this cafe!</div>
                        <div className={styles.upvoteButtonContainer}><button className={styles.upvoteButton} onClick={handleUpvote}>Upvote</button><Image className={styles.thumbup} src="/static/icons/thumbup.svg" width={25} height={25} /></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CoffeeStore