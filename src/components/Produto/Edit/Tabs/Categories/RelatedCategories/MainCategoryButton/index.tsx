import { useContext } from 'react'
import { ProductContext } from '../../../../../../../contexts/ProductContext'
import styles from './styles.module.scss'

type Props = {
    text: string;
    hubId: number;
    hoverCategory: number;
    setHoverCategory(hoverCategory: number): void;
}

export default function MainCategoryButton(props: Props){

    const { unitaryDetails, setUnitaryDetails } = useContext(ProductContext)


    const style = {
        display: `${buttonDisplay(props.hubId)}`
    }

    function buttonDisplay(hubId: number): string{
        if(hubId == props.hoverCategory || hubId == unitaryDetails.main_category_id){
            return 'flex'
        }
        return 'none'
    }

    return (
        <span
        className={styles.button}
        onClick={() => {
            if(props.hubId == unitaryDetails.main_category_id){
                setUnitaryDetails({
                    ...unitaryDetails,
                    main_category_id: 0
                })
            } else {
                setUnitaryDetails({
                    ...unitaryDetails,
                    main_category_id: props.hubId
                })
            }
        }}
        style={style}
        >
            {props.text}
        </span>
    )
}