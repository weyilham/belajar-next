import { useRouter } from "next/router";
const ShopPage = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Shopping Page</h1>
      <p>This is Shop Page</p>
      <p>
        Categori : {query.slug && query.slug[0]} - {query.slug && query.slug[1]}
      </p>
    </div>
  );
};

export default ShopPage;
