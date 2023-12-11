import React from "react";
import styles from "./Dashboard.module.css";

function Dashboard() {

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>BEST Dashboard</header>
      <div className={styles.container}>
        <button className={styles.button} href="/invoice/home">Invoicing</button>
        <button className={styles.button} href="/clients/home">Client Center</button>
        <button className={styles.button} href="/suppliers/home">Supplier Center</button>
        <button className={styles.button} href="/rfp/home">RFP</button>
      </div>
    </div>
  );
}

export default Dashboard;


