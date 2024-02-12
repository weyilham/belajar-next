import Link from "next/link";
import style from "./Login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
const LoginView = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    // console.log(error);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setLoading(false);
        push(callbackUrl);
      } else {
        setLoading(false);
        setError("Email atau Password Salah!");
      }
    } catch (error: any) {
      setLoading(false);
      setError("Email atau Password Salah!");
    }
  };
  return (
    <div className={style.login}>
      <h1 className={style.login__title}>Login</h1>
      {error && <p className={style.login__error}>{error}</p>}
      <div className={style.login__item}>
        <form onSubmit={handleSubmit} className={style.login__item__form}>
          <div className={style.login__item__form__group}>
            <label
              htmlFor="email"
              className={style.login__item__form__group__label}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Masukan Email"
              className={style.login__item__form__group__input}
            />
          </div>

          <div className={style.login__item__form__group}>
            <label
              htmlFor="Password"
              className={style.login__item__form__group__label}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Masukan Nama Lengkap"
              className={style.login__item__form__group__input}
            />
          </div>

          <button
            type="submit"
            className={style.login__item__form__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <button
          onClick={() => {
            signIn("google", {
              redirect: false,
              callbackUrl,
            });
          }}
          className={style.login__item__button__google}
        >
          Login with Google
        </button>

        <p className={style.login__item__text}>
          Belum Punya AKun ? klik{" "}
          <Link href="/auth/register" className={style.login__item__text__link}>
            disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginView;
