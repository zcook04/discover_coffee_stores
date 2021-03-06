import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'
import CoffeeCard from '../components/CoffeeCard'
import { getStores } from '../lib/coffee-stores'
import { useState, useContext, useEffect } from 'react'
import { ACTION_TYPES, StoreContext } from '../store/store-context'

export async function getStaticProps(context) {

  const coffeeStores = await getStores()

  return {
    props: {
      coffeeStores
    }
  }
}



export default function Home(props) {

  const { dispatch, state } = useContext(StoreContext)
  const { coffeeStores, latLong } = state

  useEffect(async () => {
    if (coffeeStores.length === 0) {
      const res = await fetch(`/api/getCoffeeStoresByLocation?latLong=40.72446861347544,-73.98449305630399&limit=9`)
      const fetchedStores = await res.json()
      dispatch({
        type: ACTION_TYPES.SET_COFFEE_STORES,
        payload: { coffeeStores: fetchedStores }
      })
    }

  }, [])


  const [locationHeader, setLocationHeader] = useState('New York Coffee Stores')

  const handleCoffeeStores = (stores, nearby = false) => {
    setCoffeeStores(stores)
    if (nearby) {
      setLocationHeader('Coffee Stores Nearby')
    } else {
      setLocationHeader('New York Coffee Stores')
    }
  }

  return (
    <main className={styles.container}>
      <Hero title="Coffee Shop Locator" subtitle="" handleCoffeeStores={handleCoffeeStores} />

      {props.coffeeStores.length > 0 && (
        <>
          <h2 className={styles.h2}>{locationHeader}</h2>
          <div className={styles.cardLayout}>
            {coffeeStores.map((store) => {
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
