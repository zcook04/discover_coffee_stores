import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/CoffeeCard.module.css'

function CoffeeCard({ name, imageUrl, imageAlt, href }) {
    return (
        <article className={styles.cardContainer}>
            <Link href={href}><a className={styles.link}>

                <h3 className={styles.h3}>{name}</h3>
                <Image src={imageUrl} alt={imageAlt} width={300} height={200} />

            </a></Link>
        </article>

    )
}

export default CoffeeCard