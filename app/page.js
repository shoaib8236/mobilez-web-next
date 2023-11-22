import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <Image
        className={styles.logo}
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      /> */}
      <h1>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi magni
        atque necessitatibus! Minus quis adipisci nemo voluptas incidunt.
        Facilis hic, minus consequuntur quas quos ducimus eligendi mollitia
        asperiores consequatur dignissimos.
      </h1>
    </main>
  );
}
