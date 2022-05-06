import '../styles/global.scss';

import styles from '../styles/app.module.scss';
import Header from '../components/Header/index';
import SideBar from '../components/SideBar';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import { AlertProvider } from '../contexts/AlertContext';
import Alert from '../components/Alert';
import { useEffect, useState } from 'react';
import useWindowSize from '../services/windowSize/useWindowSize';

function MyApp({ Component, pageProps }) {

  const windowSize = useWindowSize()

  

  useEffect(() => {

    console.log(windowSize)

  }, [windowSize])
  
  return (
    <AlertProvider >
      <AuthProvider >
        <div className={styles.wrapper}>
          <Header />
          <main>
            <SideBar />
            <div
            className={styles.container}
            >
              <Component {...pageProps} />
              <Alert />
            </div>
          </main>
        </div>
      </AuthProvider>
    </AlertProvider>
  )
}
  
 export default MyApp
