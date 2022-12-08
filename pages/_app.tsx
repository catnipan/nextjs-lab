import { NextPage } from 'next'
import App from 'next/app';
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (appContext) => {
  console.log('run MyApp.getInitialProps');
  App.getInitialProps(appContext);
  return {
    props: {
      hello: 'world',
      randomVal: 1,
    }
  }
}

export default MyApp
