import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'
import CoffeeCard from '../components/CoffeeCard'
import coffeeStoresData from '../data/coffee-stores.json'
import { getStores } from '../lib/coffee-stores'

export async function getStaticProps(context) {

  const coffeeStores = await getStores()

  return {
    props: {
      coffeeStores
    }
  }
}

export default function Home(props) {
  return (
    <main className={styles.container}>
      <Hero title="Coffee Shop Locator" subtitle="" />

      {props.coffeeStores.length > 0 && (
        <>
          <h2 className={styles.h2}>Philadelphia Stores</h2>
          <div className={styles.cardLayout}>
            {props.coffeeStores.map((store) => {
              return (
                <CoffeeCard key={store.id} name={store.name} imageUrl={store.imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'} href={`/coffee-store/${store.id}`} alt={store.name} neighborhood={store.neighbourhood} address={store.address} />
              )
            })}
          </div>
        </>
      )}
    </main >
  )
}
