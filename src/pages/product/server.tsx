import { ProductType } from "@/Types/Product.type";
import ProductView from "@/views/Product";

const ParoductPage = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <ProductView products={products} />
    </div>
  );
};

export default ParoductPage;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/products");
  const response = await res.json();
  return {
    props: {
      products: response.data,
    },
  };
}
