import React from 'react'
import styles from '../styles/Footer.module.css'

function Footer({ title }) {
    return (
        <footer className={styles.footer}><h1 className={styles.title}>{title}</h1></footer>
    )
}

export default Footer