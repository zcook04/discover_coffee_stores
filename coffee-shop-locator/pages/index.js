import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'
import CoffeeCard from '../components/CoffeeCard'

export default function Home() {
  return (
    <main className={styles.container}>
      <Hero title="Coffee Shop Locator" subtitle="" />
      <div className={styles.cardLayout}>
        <div className={styles.card}><CoffeeCard name="Coffee Store 1" imageUrl="/static/Coffee-Hero.jpeg" href="/coffee-store/store-1" alt="image1" /></div>
        <div className={styles.card}><CoffeeCard name="Coffee Store 1" imageUrl="/static/Coffee-Hero.jpeg" href="/coffee-store/store-1" alt="image1" /></div>
        <div className={styles.card}><CoffeeCard name="Coffee Store 1" imageUrl="/static/Coffee-Hero.jpeg" href="/coffee-store/store-1" alt="image1" /></div>
        <div className={styles.card}><CoffeeCard name="Coffee Store 1" imageUrl="/static/Coffee-Hero.jpeg" href="/coffee-store/store-1" alt="image1" /></div>
        <div className={styles.card}><CoffeeCard name="Coffee Store 1" imageUrl="/static/Coffee-Hero.jpeg" href="/coffee-store/store-1" alt="image1" /></div>
      </div>

    </main>
  )
}
