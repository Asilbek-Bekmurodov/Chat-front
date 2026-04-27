import React from "react";
import { Link } from "react-router-dom";
import styles from "./Public.module.css";

export default function Public() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>RTK Chat</h1>
      <div className={styles.actions}>
        <Link to="/login" className={`${styles.link} ${styles.linkPrimary}`}>Login</Link>
        <Link to="/register" className={`${styles.link} ${styles.linkSecondary}`}>Register</Link>
      </div>
    </div>
  );
}
