import '../styles/globals.css';
import Router from 'next/router'
import NProgress from '../components/NProgress/nprogressSetup';

// Setting up NProgress to work with onChange for routes. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
