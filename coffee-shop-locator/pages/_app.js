import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header title="Coffee Shop Locator" description="Find Local Coffee Shops Near You" />
      <Component {...pageProps} />
      {/* <Footer title="Footer" /> */}
    </>
  )
}

export default MyApp
