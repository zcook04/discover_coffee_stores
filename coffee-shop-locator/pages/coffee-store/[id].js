import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'

import styles from '../../styles/Coffee-store.module.css'
import { getStores } from '../../lib/coffee-stores'

export async function getStaticProps({ params }) {

    const coffeeStores = await getStores()

    return {
        props: {
            coffeeStore: coffeeStores.find((coffeeStore) => {
                return coffeeStore.id === params.id;
            })
        }
    }
}

export async function getStaticPaths() {
    const coffeeStores = await getStores()
    const paths = coffeeStores.map(store => {
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

function CoffeeStore(props) {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading content, please wait.</div>
    }


    const { name, imgUrl, location } = props.coffeeStore
    const [upvotes, setUpvotes] = useState(1)


    return (
        <>
            <Head><title>{name}</title></Head>
            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <div className={styles.image}><Image src={imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'} alt={name} layout='fill' priority /></div>
                </div>
                <div className={styles.rightSide}>
                    <Link href="/" ><a className={styles.link}><Image className={styles.thumbup} src="/static/icons/arrow-back.svg" width={25} height={25} />Return Home</a></Link>
                    <h2 className={styles.h2}>{name}</h2>
                    <p className={styles.address}>{location.formatted_address}</p>
                    <div className={styles.upvoteContainer}>
                        <div className={styles.upvotes}>{upvotes} People upvoted this cafe!</div>
                        <div className={styles.upvoteButtonContainer}><button className={styles.upvoteButton} onClick={() => setUpvotes(upvotes++)}>Upvote</button><Image className={styles.thumbup} src="/static/icons/thumbup.svg" width={25} height={25} /></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CoffeeStore