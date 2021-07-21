import { GetStaticProps } from 'next';
import { api } from '../../services/api2';

export default function test(props) {
    return (
        <div>
            <h1>{props.data}</h1>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const {data} = await api.get('http://localhost:4000/produtos')

    console.log(data)

    return {
        props: {
            data
        }
    }
}