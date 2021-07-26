import '../styles/global.scss';

import styles from '../styles/app.module.scss';
import Header from '../components/Header/index';
import SideBar from '../components/SideBar';

function MyApp({ Component, pageProps }) {
    return (
      <div className={styles.wrapper}>
        <Header />
        <main>
          <SideBar />
          <Component {...pageProps} />
        </main>
      </div>
    )
  }
  
  export default MyApp
