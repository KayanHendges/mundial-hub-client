import '../styles/global.scss';

import styles from '../styles/app.module.scss';
import Header from '../components/Header/index';
import SideBar from '../components/SideBar';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
    return (
      <AuthProvider >
        <div className={styles.wrapper}>
          <Header />
          <main>
            <SideBar />
            <Component {...pageProps} />
          </main>
        </div>
      </AuthProvider>
    )
  }
  
  export default MyApp
