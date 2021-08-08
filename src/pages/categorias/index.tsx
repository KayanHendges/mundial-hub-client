import { GetStaticProps } from 'next';
import Link from 'next/link';


export default function categorias(){
    return (
        <div>
            <Link href="/categorias/nova-categoria" >
                Nova Categoria
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