import Link from "next/link";
import style from "./Product.module.scss";
import Image from "next/image";
type ProductType = {
  category: string;
  id: string;
  image: string;
  name: string;
  price: number;
};
const ProductView = ({ products }: { products: ProductType[] }) => {
  return (
    <div className={style.Product}>
      <h1 className={style.Product__title}>Product Page</h1>

      <div className={style.Product__content}>
        {products.length > 0 ? (
          <>
            {products.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className={style.Product__content__item}
              >
                <div className={style.Product__content__item__image}>
                  {/* <img src={product.image} alt={product.name} /> */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                  />
                </div>
                <p className={style.Product__content__item__title}>
                  {product.name}
                </p>
                <p className={style.Product__content__item__category}>
                  {product.category}
                </p>
                <p className={style.Product__content__item__price}>
                  Rp. {product.price.toLocaleString("id-ID")}
                </p>
              </Link>
            ))}
          </>
        ) : (
          <>
            <div className={style.Product__content__skeleton}>
              <div className={style.Product__content__skeleton__image}></div>
              <div className={style.Product__content__skeleton__title}></div>
              <div className={style.Product__content__skeleton__category}></div>
              <div className={style.Product__content__skeleton__price}></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductView;
