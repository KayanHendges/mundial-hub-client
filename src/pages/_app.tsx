import '../styles/global.scss';

import styles from '../styles/app.module.scss';
import Header from '../components/Header/index';
import SideBar from '../components/SideBar';
import { AuthProvider } from '../contexts/AuthContext';
import { AlertProvider } from '../contexts/AlertContext';
import Alert from '../components/Alert';
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/queryClient';

function MyApp({ Component, pageProps }) {
  
  return (
    <QueryClientProvider  client={queryClient}>
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
    </QueryClientProvider>
  )
}
  
 export default MyApp
