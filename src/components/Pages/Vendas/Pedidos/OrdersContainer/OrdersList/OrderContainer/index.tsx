import { addHours, format, parseISO } from 'date-fns';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { OrdersContext } from '../../../../../../../contexts/OrdersContext';
import { apiV2 } from '../../../../../../../services/api/apiAxiosConfig';
import { CustomerAddress, FindCustomerParams, FindCustomerResponse } from '../../../../../../../services/api/types/Customers/Customer';
import { Order } from '../../../../../../../services/api/types/Orders/Orders';
import floatToPrice from '../../../../../../../services/floatToPrice';
import { titleize } from '../../../../../../../services/Titleize';
import RectangularPlaceholder from '../../../../../../Placeholders/Rectangular';
import handleStyles from './styles';
import dateFormat from './dateFormat';
import styles from './styles.module.scss';

type Props = {
    order: Order
}

export default function OrderContainer(props: Props){
    
    const order = props?.order

    const { expandOrderId, setExpandOrderId } = useContext( OrdersContext )
    const [ resumeOrder, setResumeOrder ] = useState<boolean>(false)
    const { wrapperStyles, infoStyles } = handleStyles({resumeOrder, setResumeOrder})

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

    function shipmentValue(price: number): string{

        if(price == 0){
            return 'frete grátis'
        }

        if(!price){
            return ''
        }

        return floatToPrice(price)
    }

    function statusColor(status: string): string {
        if(!status){
            return 
        }

        const words = status.toLowerCase().split(' ')

        if(words.includes('enviar')){
            return '#00D647'
        }

        if(words.includes('aguardando')){
            return '#ffbf00'
        }

        if(words.includes('cancelado')){
            return '#d60b00'
        }
        
        return '#FFF'
    }

    if(resumeOrder){
        return (
            <div
            className={styles.wrapper}
            style={wrapperStyles}
            onClick={() => {
                if(expandOrderId == null || expandOrderId != order.id){
                    setExpandOrderId(order.id)
                    return
                }
                setExpandOrderId(null)
            }}
            >
                {/* externalOrderId and customer name */}
                <div
                className={styles.infoContainer}
                style={infoStyles}
                >
                    <RectangularPlaceholder 
                    display={customer? 'none' : 'flex'}
                    width='10rem'
                    height='1.2rem'
                    />
                    <span className={styles.info}>
                        {order?.trayOrderId}
                    </span>
                    <span className={styles.subInfo}>{customerName(customer?.name)}</span>
                </div>
            </div>
        )
    }

    return (
        <div
        className={styles.wrapper}
        style={wrapperStyles}
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
            style={infoStyles}
            >
                <span className={styles.info}>{order?.trayOrderId}</span>
                <span className={styles.subInfo}>{storeName(order?.storeCode)}</span>
            </div>
            {/* creation date */}
            <div
            className={styles.infoContainer}
            style={infoStyles}
            >
                <span className={styles.info}>{dateFormat(order?.created)}</span>
                <span className={styles.subInfo}>{format(addHours(parseISO(order?.created), 3), 'hh:mm:ss')}</span>
            </div>
            {/* name and delivery city - state */}
            <div
            className={styles.infoContainer}
            style={infoStyles}
            >
                <RectangularPlaceholder 
                display={customer? 'none' : 'flex'}
                width='10rem'
                height='1.2rem'
                />
                <span className={styles.info} title={customer?.name}> 
                    {customerName(customer?.name)}
                </span>
                <span className={styles.subInfo}>{deliveryAddress()?.city} - {deliveryAddress()?.state}</span>
            </div>
            {/* shipment type and value */}
            <div
            className={styles.infoContainer}
            style={infoStyles}
            >
                <span className={styles.info}>{titleize(order?.chosenShippingType.substring(0, 18))}</span>
                <span className={styles.subInfo}>{shipmentValue(order?.chosenShippingValue)}</span>
            </div>
            {/* total order and payment method */}
            <div
            className={styles.infoContainer}
            style={infoStyles}
            >
                <span className={styles.info}>{floatToPrice(order?.total)}</span>
                <span className={styles.subInfo}>{titleize(order?.paymentMethod)}</span>
            </div>
            {/* status of order */}
            <div
            className={styles.statusContainer}
            style={infoStyles}
            >
                <span
                className={styles.statusColor}
                style={{ backgroundColor: statusColor(order?.status) }}
                ></span>
                <span
                className={styles.statusLabel}
                title={order?.status}
                >
                    {order?.status?.toLowerCase().substring(0, 14)}{order?.status.length > 13? '...' : ''}
                </span>
            </div>
        </div>
    )
}