import { addHours, format, parseISO } from 'date-fns';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { OrdersContext } from '../../../../../../../contexts/OrdersContext';
import { apiV2 } from '../../../../../../../services/api/apiAxiosConfig';
import { CustomerAddress, FindCustomerParams, FindCustomerResponse } from '../../../../../../../services/api/types/Customers/Customer';
import { Order } from '../../../../../../../services/api/types/Orders/Orders';
import floatToPrice from '../../../../../../../services/floatToPrice';
import { titleize } from '../../../../../../../services/Titleize';
import RectangularPlaceholder from '../../../../../../Placeholders/Rectangular';
import dateFormat from './dateFormat';
import styles from './styles.module.scss';

type Props = {
    order: Order
}

export default function OrderContainer(props: Props){
    
    const order = props?.order

    const { expandOrderId, setExpandOrderId } = useContext( OrdersContext )

    const { data, isFetching: customerFetching } = useQuery<FindCustomerResponse>(`orders_customer_id_${order?.customerId}`,
    async() => {
        const body: FindCustomerParams = { id: order?.customerId}
        const response = await apiV2.post('/customers/find', body)

        return response.data
    },
    {
        refetchOnWindowFocus: true
    }
    )

    const customer = data?.customer
    const addresses = customer?.addresses
    const deliveryAddress = () => {
        var deliveryAddress: CustomerAddress = null
        addresses?.map( address => {
            if(deliveryAddress){ return }
            if(address.id == order.shippingAddressId){
                deliveryAddress = address
            }
        })
        return deliveryAddress
    }
    
    function storeName(storeCode: number): string{
        if(storeCode == 668385){
            return 'mundial'
        }

        if(storeCode == 1049898){
            return 'santa cruz'
        }

        return ''
    }

    function customerName(fullName: string): string{
        if(!fullName){
            return ''
        }
        const names = []
        const separateName = fullName.split(' ')
        separateName.map((name, index) => {
            if(index == 0 || index == separateName.length-1){
                names.push(name)
            }
        })
        return names.join(' ')
    }

    return (
        <div
        className={styles.wrapper}
        onClick={() => {
            if(expandOrderId == null || expandOrderId != order.id){
                setExpandOrderId(order.id)
                return
            }
            setExpandOrderId(null)
        }}
        >
            {/* externalOrderId and store name */}
            <div
            className={styles.infoContainer}
            >
                <span className={styles.info}>{order?.trayOrderId}</span>
                <span className={styles.subInfo}>{storeName(order?.storeCode)}</span>
            </div>
            {/* creation date */}
            <div
            className={styles.infoContainer}
            >
                <span className={styles.info}>{dateFormat(order?.created)}</span>
                <span className={styles.subInfo}>{format(addHours(parseISO(order?.created), 3), 'hh:mm:ss')}</span>
            </div>
            {/* name and delivery city - state */}
            <div
            className={styles.infoContainer}
            >
                <RectangularPlaceholder 
                display={customer? 'none' : 'flex'}
                width='10rem'
                height='1.2rem'
                />
                <span className={styles.info}> 
                    {customerName(customer?.name)}
                </span>
                <span className={styles.subInfo}>{deliveryAddress()?.city} - {deliveryAddress()?.state}</span>
            </div>
            {/* forma de envio */}
            <div
            className={styles.infoContainer}
            >
                <span className={styles.info}>{titleize(order?.chosenShippingType.substring(0, 18))}</span>
                <span className={styles.subInfo}>{floatToPrice(order?.chosenShippingValue)}</span>
            </div>
            <div
            className={styles.infoContainer}
            >
                <span className={styles.info}>{floatToPrice(order?.total)}</span>
                <span className={styles.subInfo}>{titleize(order?.paymentMethod)}</span>
            </div>
        </div>
    )
}