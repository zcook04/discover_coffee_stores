import React from 'react'
import Image from 'next/image'
import styles from '../styles/Hero.module.css'

function Hero({ title, subtitle }) {
    return (
        <section className={styles.outerContainer}>
            <div className={styles.heroText}>
                <h1 className={styles.title} >{title}</h1>
                <h3 className={styles.subtitle} >{subtitle}</h3>
                <button className={styles.button} onClick={(e) => console.log('clicked')}>Search Shops Now</button>
            </div>

            <Image src="/static/Coffee-Hero.jpeg" layout='fill' className={styles.heroImage} priority></Image>
        </section >
    )
}

export default Hero