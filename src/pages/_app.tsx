import '../styles/global.scss';

import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
    return (
      <div className={styles.wrapper}>
        <Component {...pageProps} />
      </div>
    )
  }
  
  export default MyApp
