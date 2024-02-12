import { fetcher } from "@/lib/swr/fatcher";
import DetailProduct from "@/views/DetailProduct";
import { useRouter } from "next/router";
import useSWR from "swr";
import { ProductType } from "@/Types/Product.type";
const DetailProductPage = ({ product }: { product: ProductType }) => {
  const { query } = useRouter();

  // const { data, error, isLoading } = useSWR(
  //   `/api/products/${query.product}`,
  //   fetcher
  // );

  // console.log(id);
  return (
    <div>
      {/* client server rendering */}
      {/* <DetailProduct product={isLoading ? [] : data.data} /> */}
      {/* server side rendering */}
      <DetailProduct product={product} />
    </div>
  );
};

export default DetailProductPage;

export async function getServerSideProps({
  params,
}: {
  params: { product: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.product}`
  );
  const response = await res.json();

  return {
    props: {
      product: response.data,
    },
  };
}

//static site generation

// export async function getStaticPaths() {
//   const res = await fetch("http://localhost:3000/api/products");
//   const restponse = await res.json();

//   const paths = restponse.data.map((product: ProductType) => ({
//     params: { product: product.id },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({
//   params,
// }: {
//   params: { product: string };
// }) {
//   const res = await fetch(
//     `http://localhost:3000/api/products/${params.product}`
//   );
//   const response = await res.json();

//   return {
//     props: {
//       product: response.data,
//     },
//   };
// }
