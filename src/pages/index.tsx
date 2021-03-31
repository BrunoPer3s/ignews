import Head from "next/head";
import { GetStaticProps }from 'next';
import { SubscribeButton } from "../components/SubscribeButton";
import styles from '../styles/pages/home.module.scss';
import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>ig.news</title>
      </Head>
      <main className={styles.Content}>
        <div>
          <span> <img src="/images/claps.png" alt=""/> Hey, welcome</span>
          <h1>News about <br/>the <strong>React</strong> world</h1>
          <p>Get access to all the publications<br/><strong>for {product.amount} month</strong> </p>
          <SubscribeButton priceId={product.priceId}/>
        </div>
        <div>
          <img src="/images/avatar.svg" alt="girl coding"/>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async() => {
  const price = await stripe.prices.retrieve('price_1IZaoQLkcSN9Sh6QdPpp9h5Q');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
