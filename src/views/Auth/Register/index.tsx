import Link from "next/link";
import style from "./Register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
const RegisterView = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = {
      email: event.target.email.value,
      fullname: event.target.fullname.value,
      password: event.target.password.value,
    };
    const result = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      event.target.reset();
      setLoading(false);
      push("/auth/login");
    } else {
      setLoading(false);
      setError(result.status === 400 ? "Email sudah terdaftar" : "");
    }
  };
  return (
    <div className={style.register}>
      <h1 className={style.register__title}>Register</h1>
      {error && <p className={style.register__error}>{error}</p>}
      <div className={style.register__item}>
        <form onSubmit={handleSubmit} className={style.register__item__form}>
          <div className={style.register__item__form__group}>
            <label
              htmlFor="email"
              className={style.register__item__form__group__label}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Masukan Email"
              className={style.register__item__form__group__input}
            />
          </div>

          <div className={style.register__item__form__group}>
            <label
              htmlFor="fullname"
              className={style.register__item__form__group__label}
            >
              Fullname
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Masukan Nama Lengkap"
              className={style.register__item__form__group__input}
            />
          </div>

          <div className={style.register__item__form__group}>
            <label
              htmlFor="Password"
              className={style.register__item__form__group__label}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Masukan Nama Lengkap"
              className={style.register__item__form__group__input}
            />
          </div>

          <button
            type="submit"
            className={style.register__item__form__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className={style.register__item__text}>
          Sudah punya akun? klik{" "}
          <Link href="/auth/login" className={style.register__item__text__link}>
            disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;
