import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { api } from '../../services/api'

type Product = {
    ean: string;
    name: string;
    description: string;
    descriptionSmall: string;
    price: Number;
    costPrice: Number;
    promotionPrice: Number;
    startPromotion: string;
    endPromotion: string;
    brand: string;
    model: string;
    weight: Number;
    lenght: Number;
    widht: Number;
    height: Number;
    stock: Number;
    categoryId: string;
    availability: Number;
    availabilityDays: Number;
    reference: string;
    relatedCategories: string;
    releaseDate: string;
    pictureSource1: string;
    pictureSource2: string;
    pictureSource3: string;
    pictureSource4: string;
    pictureSource5: string;
    pictureSource6: string;
    virtualProduct: Number;
  }

type ProductProps = {
    product: Product[]
}

export default function product({ product }: ProductProps) {
    const router = useRouter()

    return (
        <div>
            <h1>{router.query.product}</h1>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params;


    const { data } = await api.get(`/products/1`)
    console.log(slug)

    const product = {
          ean: data.ean,
          name: data.name,
          description: data.description,
          descriptionSmall: data.description_small,
          price: data.price,
          costPrice: data.cost_price,
          promotionPrice: data.promotion_price,
          startPromotion: data.start_promotion,
          endPromotion: data.end_promotion,
          brand: data.brand,
          model: data.model,
          weight: data.weight,
          lenght: data.lenght,
          widht: data.widht,
          height: data.height,
          stock: data.stock,
          categoryId: data.category_id,
          availability: data.availability,
          availabilityDays: data.availability_days,
          reference: data.reference,
          relatedCategories: data.related_categories,
          releaseDate: data.release_date,
          pictureSource1: data.picture_source_1,
          pictureSource2: data.picture_source_2,
          pictureSource3: data.picture_source_3,
          pictureSource4: data.picture_source_4,
          pictureSource5: data.picture_source_5,
          pictureSource6: data.picture_source_6,
          virtualProduct: data.virtual_product
    };

    return {
        props: {
            product,
        },
        revalidate: 8,
    }
}