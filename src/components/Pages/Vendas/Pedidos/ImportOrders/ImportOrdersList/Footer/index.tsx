import { ListTrayOrdersParams, ListTrayOrdersResponse } from '../../../../../../../services/api/types/Tray/Orders/Orders'
import RectangularPlaceholder from '../../../../../../Placeholders/Rectangular'
import PageSelector from '../../../../../../Produto/ProductList/Footer/PageSelector'
import styles from './styles.module.scss'

type Props = {
    orders: ListTrayOrdersResponse
    ordersParams: ListTrayOrdersParams
    setOrdersParams(ordersParams: ListTrayOrdersParams): void;
    loading: boolean;
}

export default function Footer(props: Props){

    if(!props.orders){
        return <></>
    }

    if(props.loading){
        return (
            <div
            className={styles.wrapper}
            >
                <RectangularPlaceholder 
                height='2rem'
                width='19rem'
                />
            </div>
        )
    }

    const { page, limit, total, totalPages } = props?.orders

    const pages: number[] = []

    for (let page = 1; page <= totalPages; page++) {
        pages.push(page)
    }

    return (
        <div
        className={styles.wrapper}
        >
            <PageSelector 
            label='paginas'
            page={page}
            pages={pages}
            setPage={page => {
                props.setOrdersParams({...props.ordersParams, page: page as number})
            }}        
            />
            <PageSelector 
            label='por página'
            page={limit}
            pages={[10, 20, 30, 50]}
            setPage={page => {
                props.setOrdersParams({...props.ordersParams, limit: page as number})
            }}        
            />
            <span
            className={styles.totalOrders}
            >
                {`${total > 0? total : ''} ${total > 0? 'pedidos' : ''}`}
            </span>
        </div>
    )
}