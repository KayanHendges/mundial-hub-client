import Link from "next/link"
import { useRouter } from "next/router"

export default function tray(){

    const router = useRouter().asPath
    const routerSplit = router.split("?url=https://")
    const parameter = routerSplit[1]
    const url = `https://${parameter}/auth.php?response_type=code&consumer_key=de64a56c6cb078828acc0d62ad9ab08c16a89440edddc28dd26ab9788ebdd10d&callback=https://wwww.mundialhub.com.br/oAuth2Tray`

    return(
        <div>
            <h1>
                Mundial Hub
            </h1>
            <Link href={url}>
                <button>
                    integrar
                </button>
            </Link>
            <h1>
                {parameter}
            </h1>
        </div>
    )
}

export async function getServerSideProps({ req }) {

    console.log(req.query)

    return {
        props: {}
    }
}