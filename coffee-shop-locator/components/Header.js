import React from 'react'
import Head from 'next/head'
import styles from '../styles/Header.module.css'


function Header({ title, description }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
            </header>
        </>
    )
}

export default Header