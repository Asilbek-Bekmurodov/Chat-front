import styles from "./Join.module.css";

function Join() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Join a chat</p>
      <input className={styles.input} type="text" placeholder="Enter chat ID..." />
      <button className={styles.button}>Join</button>
    </div>
  );
}
export default Join;
