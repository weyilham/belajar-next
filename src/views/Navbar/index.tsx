import { signIn, signOut, useSession } from "next-auth/react";
import style from "./Navbar.module.scss";
import Image from "next/image";

const NavbarView = () => {
  const { data }: any = useSession();

  return (
    <div className="navbar">
      <div className={style.navbar__title}>
        <h3>Navbar</h3>
      </div>

      <div className={style.navbar__profile}>
        {data?.user.image && (
          <Image
            src={data.user.image}
            alt={data.user.name}
            width={30}
            height={30}
            className="imageProfile"
          />
        )}
        <h4>{(data && data?.user.fullname) || data?.user.name}</h4>

        {data ? (
          <button onClick={() => signOut()} className="buttonNav">
            Sign out
          </button>
        ) : (
          <button onClick={() => signIn()} className="buttonNav">
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default NavbarView;
