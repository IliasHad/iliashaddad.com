import '../styles/globals.css'
import { ThemeProvider } from "../context/ThemeContext";
import PlausibleProvider from 'next-plausible'

function MyApp({ Component, pageProps }) {
  return <PlausibleProvider domain="iliashaddad.com">
    <ThemeProvider><Component {...pageProps} /> </ThemeProvider>
  </PlausibleProvider>
}

export default MyApp
