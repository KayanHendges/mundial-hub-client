import { GetStaticProps } from 'next';
import Link from 'next/link';


export default function produtos(){
    return (
        <div>
            <Link href="/produtos/novo-produto" >
                Novo produto
            </Link>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {


    return {
        props: {
            
        }
    }
}