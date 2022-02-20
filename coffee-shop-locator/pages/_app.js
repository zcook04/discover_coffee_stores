import '../styles/globals.css'
import Header from '../components/Header'
import StoreProvider from '../store/store-context'


function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Header title="Coffee Shop Locator" description="Find Local Coffee Shops Near You" />
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
