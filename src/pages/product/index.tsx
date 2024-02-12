import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "./Product.module.scss";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fatcher";
import ProductView from "@/views/Product";

const Product = () => {
  const { push } = useRouter();
  const [isLogin, setLogin] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (!isLogin) {
      push("/auth/login");
    }
  }, []);

  // useEffect(() => {
  //   fetch("/api/products")
  //     .then((res) => res.json())
  //     .then((response) => {
  //       setProducts(response.data);
  //     });
  // }, []);

  const { data, error, isLoading } = useSWR("/api/products", fetcher);

  return (
    <div>
      <ProductView products={isLoading ? [] : data.data} />
    </div>
  );
};

export default Product;
