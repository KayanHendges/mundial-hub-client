import styles from './styles.module.scss'
import Link from 'next/link';
import KitContainer from '../KitContainer'
import PriceContainer from '../../PriceContainer'
import PopUp from '../../PopUp'
import { useEffect, useState } from 'react'
import { api } from '../../../../../../services/api'
import router from 'next/router';
import ImageZoom from './ImageZoom';

type ProductContainerStyle = {
    border: string;
    WebkitBoxShadow: string;
    boxShadow: string;
}

type UnitaryRowStyle = {
    height: string;
}

type OptionsStyle = {
    height: string;
    borderTop: string;
}

type EditButton = {
    backgroundColor: string;
    color: string;
}

type ContainerStyle = {
    active: boolean;
    productContainer: ProductContainerStyle;
    unitaryRow: UnitaryRowStyle;
    options: OptionsStyle;
}

export default function ProductContainer(props){

    const hoverSelectedStyle = {
        active: false,
        productContainer: {
            border: '1px solid var(--complementar-text)',
            WebkitBoxShadow: '0px 0px 12px -4px rgba(250,250,250,0.31)',
            boxShadow: '0px 0px 12px -4px rgba(250,250,250,0.31)'
        },
        unitaryRow: {
            height: '5rem'
        },
        options: {
            height: '0rem',
            borderTop: 'none',
        }
    }
    const selectedStyle = {
        active: true,
        productContainer: {
            border: '1px solid var(--white-text)',
            WebkitBoxShadow: '0px 0px 12px -4px rgba(250,250,250,0.31)',
            boxShadow: '0px 0px 12px -4px rgba(250,250,250,0.31)'
        },
        unitaryRow: {
            height: '5rem'
        },
        options: {
            height: '3rem',
            borderTop: '1px solid var(--gray-line)',
        }
    }
    const notSelectedStyle = {
        active: false,
        productContainer: {
            border: '1px solid transparent',
            WebkitBoxShadow: 'none',
            boxShadow: 'none'
        },
        unitaryRow: {
            height: '5rem'
        },
        options: {
            height: '0rem',
            borderTop: 'none',
        }
    }
    
    const onEnterEditButton = {
        backgroundColor: 'var(--gray-5)',
        color: 'var(--white-text)'
    }
    const onLeaveEditButton = {
        backgroundColor: 'var(--gray-4)',
        color: 'var(--complementar-text)'
    }

    const onEnterDeleteButton = {
        backgroundColor: '#9306063b',
        color: '#E01D10'
    }
    const onLeaveDeleteButton = {
        backgroundColor: 'var(--gray-4)',
        color: 'var(--complementar-text)'
    }

    const [ containerStyle, setContainerStyle ] = useState<ContainerStyle>(notSelectedStyle)
    const [ editStyles, setEditStyles ] = useState<EditButton>(onLeaveEditButton)
    const [ deleteStyles, setDeleteStyles ] = useState<EditButton>(onLeaveDeleteButton)
    const [ showKitsStyles, setShowKitsStyles ] = useState<EditButton>(onLeaveDeleteButton)
    const [ updateStyles, setUpdateStyles ] = useState<EditButton>(onLeaveEditButton)
    const [ imageZoomDisplay, setImageZoomDisplay ] = useState('none')
    const [ deleteBoxDisplay, setDeleteBoxDisplay ] = useState('none')
    const [ updateImagesSpan, setUpdateImagesSpan ] = useState<string>('atualizar imagens')

    const [ showKits, setShowKits ] = useState({
        individual: true,
        show: false,
        display: 'none',
        request: false,
        rotate: '0deg',
        border: '1px solid var(--complementar-text)'
    })

    const [ kits, setKits ] = useState([])

    useEffect(() => {
        if(props.indexState.selectedIndex != props.index){
            setContainerStyle(notSelectedStyle)
        } 
        if(props.indexState.selectedIndex == props.indexState.index){
            setContainerStyle(selectedStyle)
        }
    }, [props.indexState.selectedIndex])

    useEffect(() => {
        showKitsParams(props.search.showKits)
    }, [props.onChangeSearch])

    function whichKits(seachKits){
        if(seachKits.length > 0){
            return seachKits
        } else {
            return kits
        }
    }

    function updateImages(reference){
        setUpdateImagesSpan('atualizando...')
        api.post(`/products/update-images/${reference}`)
        .then(response => {
            if(response.data.code == 200){
                setUpdateImagesSpan('atualizado')
                router.reload()
            } else {
                console.log(response.data)
            }
        })
        .catch(erro => {
            alert(erro.response.data.message)
            console.log(erro)
        })
    }

    function showKitsParams(showKits){
        if(showKits == true){
            setShowKits({
                ...showKits,
                display: 'flex',
                show: true,
                rotate: '-90deg',
                border: '1px solid var(--complementar-text)'
            })
        } else {
            setShowKits({
                ...showKits,
                display: 'none',
                show: false,
                rotate: '0deg',
                border: '1px solid var(--complementar-text)'
            })
        }
    }

    function dropKits(boolean, reference){
        if(boolean && props.search.showKits != true){
            if(showKits.request){
                setShowKits({
                    ...showKits,
                    display: 'flex',
                    show: true,
                    rotate: '-90deg',
                    border: '1px solid var(--complementar-text)'
                })
            } else {
                requestKits(reference)
            }
        } else {
            if(boolean){
                setShowKits({
                    ...showKits,
                    display: 'flex',
                    show: true,
                    rotate: '-90deg',
                    border: '1px solid var(--complementar-text)'
                })
            } else {
                setShowKits({
                    ...showKits,
                    display: 'none',
                    show: false,
                    rotate: '0deg',
                    border: '1px solid var(--complementar-text)'
                })
            }
        }
    }

    function requestKits(reference){
        if(props.search.showKits != true){
            setShowKits({...showKits, rotate: '-90deg'})
            api.get(`/products/list/kits/${reference}`)
            .then(response => {
                if(response.data.kits.length > 0){
                    setKits(response.data.kits)
                    setShowKits({
                        ...showKits,
                        display: 'flex',
                        request: true,
                        show: true,
                        rotate: '-90deg',
                        border: '1px solid #207567'
                    })
                    setTimeout(() => {
                        setShowKits({
                            ...showKits,
                            display: 'flex',
                            request: true,
                            show: true,
                            rotate: '-90deg',
                            border: '1px solid var(--complementar-text)'
                        })
                    }, 1000);
                } else {
                    setShowKits({
                        ...showKits,
                        display: 'none',
                        show: false,
                        rotate: '0deg',
                        border: '1px solid #E01D10'
                    })
                }
            })
            .catch(erro => {
                setShowKits({
                    ...showKits,
                    display: 'none',
                    show: false,
                    rotate: '0deg',
                    border: '1px solid #E01D10'
                })
            })
        }
    }

    function linkStore(trayId){
        if(props.search.store == 668385){
            return `https://www.mundialpneumaticos.com.br/loja/produto.php?IdProd=${trayId}`
        }
        if(props.search.store == 1049898){
            return `https://www.scpneus.com.br/loja/produto.php?IdProd=${trayId}`
        }
    }

    return (
        <div
        className={styles.productContainer}
        style={containerStyle.productContainer}
        onMouseEnter={() => {
            if(!containerStyle.active){
                setContainerStyle(hoverSelectedStyle)
            }
        }}
        onMouseLeave={() => {
            if(!containerStyle.active){
                setContainerStyle(notSelectedStyle)
            }
        }}
        >
            <div
            className={styles.unitaryRow}
            style={containerStyle.unitaryRow}
            onClick={() => {
                if(containerStyle.active){
                    props.indexState.setSelectedIndex(-1)
                }
                if(!containerStyle.active){
                    props.indexState.setSelectedIndex(props.indexState.index)
                }
            }}
            >
                <div
                className={styles.bodyCell}
                >
                    {props.produto.reference}
                </div>
                <div
                className={styles.bodyCell}
                >
                    <div
                    style={{
                        width: "3.5rem",
                        height: "3.5rem",
                        borderRadius: ".4rem",
                        whiteSpace: "nowrap",
                        backgroundImage: `url("${props.produto.thumbnail.length > 0 ? props.produto.thumbnail : props.produto.imageUrl}")`,
                        backgroundSize: 'cover',
                        cursor: 'pointer'
                    }}
                    onClick={() => setImageZoomDisplay('flex')}
                    >
                    </div>
                </div>
                <div
                className={styles.productName}
                >
                    <span>
                        {props.produto.name}
                        <span 
                        className='material-icons'
                        id={styles.icon}
                        >
                            <a
                            href={`${linkStore(props.produto.trayId)}`}
                            target="_blank"
                            >
                                open_in_new
                            </a>
                        </span>
                    </span>
                    
                </div>
                <div
                className={styles.bodyCell}
                >
                    {props.produto.stockTray}
                </div>
                <div
                className={styles.bodyCell}
                >
                    <PriceContainer 
                    price={props.produto.price}
                    promotionalPrice={props.produto.promotionalPrice}
                    startPromotion={props.produto.startPromotion}
                    endPromotion={props.produto.endPromotion}
                    />
                </div>
            </div>
            <KitContainer
            display={showKits.display}
            kits={whichKits(props.produto.kits)}
            search={props.search}
            />
            <div
            className={styles.options}
            style={containerStyle.options}
            >
                <span
                className={styles.showKitsButton}
                style={showKitsStyles}
                onMouseOver={() => setShowKitsStyles(onEnterEditButton)}
                onMouseLeave={() => setShowKitsStyles(onLeaveDeleteButton)}
                onClick={() => dropKits(!showKits.show, props.produto.reference)}
                >
                    {`${!showKits.show ? 'mostrar kits' : 'ocultar kits' }`}
                </span>
                <Link href={`/produtos/${props.produto.reference}`}>
                    <span
                    className={styles.optionsButton}
                    style={editStyles}
                    onMouseOver={() => setEditStyles(onEnterEditButton)}
                    onMouseLeave={() => setEditStyles(onLeaveEditButton)}
                    >
                        editar
                    </span>
                </Link>
                <span
                className={styles.optionsButton}
                style={updateStyles}
                onMouseOver={() => setUpdateStyles(onEnterEditButton)}
                onMouseLeave={() => setUpdateStyles(onLeaveEditButton)}
                onClick={() => updateImages(props.produto.reference)}
                >
                    {updateImagesSpan}
                </span>
                <span
                className={styles.optionsButton}
                style={deleteStyles}
                onMouseOver={() => setDeleteStyles(onEnterDeleteButton)}
                onMouseLeave={() => setDeleteStyles(onLeaveDeleteButton)}
                onClick={() => setDeleteBoxDisplay('flex')}
                >
                    excluir
                </span>
            </div>
            <ImageZoom 
            imageUrl={props.produto.imageUrl}
            display={imageZoomDisplay}
            setDisplay={setImageZoomDisplay}
            />
            <div
            className={styles.deleteBox}
            style={{ display: `${deleteBoxDisplay}` }}
            >
                <div
                className={styles.box}
                >
                    <span
                    className={styles.boxTitle}
                    >
                        {`Você tem certeza que deseja excluir o produto ${props.produto.reference}?`}
                    </span>
                    <div
                    className={styles.buttonsRow}
                    >
                        <button
                        type='button'
                        className={styles.decline}
                        onClick={() => setDeleteBoxDisplay('none')}
                        >
                            cancelar
                        </button>
                        <button
                        type='button'
                        className={styles.accept}
                        >
                            excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}