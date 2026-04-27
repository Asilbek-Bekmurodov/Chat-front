import { useState } from "react";
import { useLoginMutation } from "../../app/services/authApi";
import { useDispatch } from "react-redux";
import { getCredentials } from "../../app/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [login, { isError, isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await login(formData).unwrap();
    if (res) {
      localStorage.setItem("token", res.accessToken);
      dispatch(
        getCredentials({
          token: res.accessToken,
          user: res.user,
        }),
      );
      if (res.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    }
    console.log(res);
  }

  if (isError) return <div className={styles.error}>Nimadur xato ketdi!</div>;
  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Link to="/" className={styles.back}>← Back</Link>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            onChange={handleChange}
            placeholder="Username"
            name="username"
            type="text"
          />
          <input
            className={styles.input}
            onChange={handleChange}
            placeholder="Password"
            name="password"
            type="password"
          />
          <button className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}
