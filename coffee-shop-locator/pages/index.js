import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'
import CoffeeCard from '../components/CoffeeCard'
import coffeeStoresData from '../data/coffee-stores.json'

export async function getStaticProps(context) {
  return {
    props: {
      coffeeStores: coffeeStoresData
    }
  }
}

export default function Home(props) {
  return (
    <main className={styles.container}>
      <Hero title="Coffee Shop Locator" subtitle="" />

      {props.coffeeStores.length > 0 && (
        <>
          <h2 className={styles.h2}>Toronto Stores</h2>
          <div className={styles.cardLayout}>
            {props.coffeeStores.map((store) => {
              return (
                <CoffeeCard key={store.id} name={store.name} imageUrl={store.imgUrl} href={`/coffee-store/${store.id}`} alt={store.name} neighborhood={store.neighbourhood} address={store.address} />
              )
            })}
          </div>
        </>
      )}
    </main >
  )
}
