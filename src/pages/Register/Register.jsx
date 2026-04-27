import { useState } from "react";
import { useRegisterMutation } from "../../app/services/authApi";
import { useDispatch } from "react-redux";
import { getCredentials } from "../../app/features/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [register, { isError, isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await register(formData).unwrap();
    if (res) {
      localStorage.setItem("token", res.accessToken);
      dispatch(
        getCredentials({
          token: res.accessToken,
          user: res.user,
        }),
      );
      navigate("/login");
    }
    console.log(res);
  }

  if (isError) return <div className={styles.error}>Nimadur xato ketdi!</div>;
  if (isLoading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Register</h1>
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
          <button className={styles.button}>Register</button>
        </form>
      </div>
    </div>
  );
}
