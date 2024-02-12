import { ProductType } from "@/Types/Product.type";
import style from "./DetailProduct.module.scss";
import Image from "next/image";

const DetailProduct = ({ product }: { product: ProductType }) => {
  return (
    <>
      <h1 className={style.title}>Detail Product</h1>
      <div key={product.id} className={style.ProductDetail}>
        <div className={style.ProductDetail__image}>
          {/* <img src={product.image} alt={product.name} /> */}
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
          />
        </div>
        <p className={style.ProductDetail__title}>{product.name}</p>
        <p className={style.ProductDetail__category}>{product.category}</p>
        <p className={style.ProductDetail__price}>
          Rp. {product.price && product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </>
  );
};
export default DetailProduct;
