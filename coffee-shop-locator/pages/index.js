import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <main className={styles.container}>
      <Hero title="Coffee Shop Locator" subtitle="" />
    </main>
  )
}
