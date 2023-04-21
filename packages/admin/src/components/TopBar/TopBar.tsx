import { type FC } from "react";
import Link from "next/link";

import classes from "./TopBar.module.css";

export const TopBar: FC = () => (
  <div className={classes.topBar}>
    <div className={classes.logo}>
      <div className={classes.logoPrimary}>Наш Урал</div>
      <div className={classes.logoSecondary}>Платные материалы</div>
    </div>
    <div className={classes.menu}>
      <Link href="/materials" className={classes.menuLink}>
        Материалы
      </Link>
    </div>
  </div>
);
