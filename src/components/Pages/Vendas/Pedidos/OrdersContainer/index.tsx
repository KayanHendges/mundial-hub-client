import InputsContainer from './InputsContainer';
import OrdersHeader from './OrdersHeader';
import OrdersList from './OrdersList';
import styles from './styles.module.scss';

export default function OrdersContainer(){

    return (
        <div
        className={styles.wrapper}
        >
            <OrdersHeader />
            <InputsContainer />
            <OrdersList />
        </div>
    )
}