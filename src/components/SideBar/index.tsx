import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles.module.scss';

type WrapperStyle = {
    extended: boolean;
    width: string;
}

type SideBarStyle = {
    extended: boolean;
    width: string;
}

type OpenItem = {
    open: boolean;
    index: number;
}

type SubItem = {
    title: string;
    href: string;
}

type Item = {
    title: string;
    googleIcon: string;
    subItems?: SubItem[];
}

export default function SideBar (){

    const shortWrapperStyle: WrapperStyle = {
        extended: false,
        width: '3rem'
    }

    const shortSideBarStyle: SideBarStyle = {
        extended: false,
        width: '3rem'
    }

    const extendedWrapperStyle: WrapperStyle = {
        extended: true,
        width: '12rem',
    }

    const extendedSideBarStyle: SideBarStyle = {
        extended: true,
        width: '12rem'
    }

    const [ wrapperStyle, setWrapperStyle ] = useState<WrapperStyle>(shortWrapperStyle)
    const [ sideBarStyle, setSideBarStyle ] = useState<SideBarStyle>(shortSideBarStyle)
    const [ openItem, setOpenItem ] = useState<OpenItem>({
        open: false,
        index: 0
    })

    const itemsList: Item[] = [
        {
            title: 'catalogo',
            googleIcon: 'storefront',
            subItems: [
                {
                    title: 'produtos',
                    href: '/produtos'
                },
                {
                    title: 'categorias',
                    href: '/categorias'
                },
                {
                    title: 'fornecedores',
                    href: '/fornecedores/produtos'
                },
                {
                    title: 'sincronizar',
                    href: '/fornecedores/sincronizar-produtos'
                },
            ]
        },
    ]

    const router = useRouter()
    
    useEffect(() => {

        if(router.route == '/'){
            setWrapperStyle(extendedWrapperStyle)
            setSideBarStyle(extendedSideBarStyle)
        } else {
            setWrapperStyle(shortWrapperStyle)
            setSideBarStyle(shortSideBarStyle)
        }

        itemsList.map((item, index) => {
            item.subItems?.map(subItem => {
                if(subItem.href == router.route){
                    setTimeout(() => {
                        setOpenItem({
                            ...openItem,
                            index: index
                        })
                    }, 0)
                }
            })
        })

    }, [router.route])

    useEffect(() => {

        if(sideBarStyle.extended){
            setOpenItem({
                ...openItem,
                open: true
            })
        } else {
            setOpenItem({
                ...openItem,
                open: false
            })
        }

    }, [sideBarStyle])

    return (
        <div
        className={styles.wrapper}
        style={wrapperStyle}
        >
            <div
            className={styles.sideBar}
            style={sideBarStyle}
            onMouseEnter={() => setSideBarStyle(extendedSideBarStyle)}
            onMouseLeave={() => {
                if(!wrapperStyle.extended){
                    setSideBarStyle(shortSideBarStyle)
                }
            }}
            >
                {itemsList?.map((item, index) => {

                    const subItemHeight = index == openItem.index && item.subItems?
                    `${item.subItems.length * 2}rem` : '0rem'

                    const opacity =  index == openItem.index && openItem.open && sideBarStyle.extended? '100%' : '0%' 

                    return (
                        <div
                        className={styles.itemContainer}
                        key={index}
                        >
                            <div
                            className={styles.headerContainer}
                            onClick={() => {
                                if(openItem.index == index){
                                    setOpenItem({ open: true, index: -1 })
                                } else {
                                    setOpenItem({ open: true, index: index })
                                }
                            }}
                            >
                                <div
                                className={styles.headerIcon}
                                >
                                    <span 
                                    className="material-icons"
                                    id={styles.iconSpan}
                                    >
                                        {item.googleIcon}
                                    </span>
                                </div>
                                <div
                                className={styles.headerDescription}
                                >
                                    <span>
                                        {item.title}
                                    </span>
                                </div>
                            </div>
                            <div
                            className={styles.subItemsList}
                            style={{ height: `${openItem.open && sideBarStyle.extended? subItemHeight : '0rem'}` }}
                            >
                                {item.subItems?.map((subItem, i) => {

                                    const textColor = subItem.href == router.route? { color: 'var(--white-text)' } : undefined

                                    return (
                                        <Link href={subItem.href} key={i}>
                                            <div
                                            className={styles.subItemContainer}
                                            style={{ opacity: opacity }}
                                            >
                                                <span
                                                style={textColor}
                                                >
                                                    {subItem.title}
                                                </span>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

    // return (
    //     <div
    //     className={styles.sideBar}
    //     >
    //         <div className={styles.itemContainer} onChange={this}>
    //             <div className={styles.iconBox}>
    //                 <a>
    //                     <img src="/tag1.png" alt="tag" />
    //                 </a>
    //             </div>
    //             <div className={styles.itemTextContainer}>
    //                 <span>Catalogo</span>
    //             </div>
    //         </div>
    //         <div className={styles.subItemContainer}>
    //             <Link href={"/produtos"}>
    //                 <p>Produtos</p>
    //             </Link>
    //             <Link href={"/fornecedores/produtos"}>
    //                 <p>Fornecedores</p>
    //             </Link>
    //             <Link href={"/categorias"}>
    //                 <p>Categorias</p>
    //             </Link>
    //         </div>
    //     </div>
    //)
}