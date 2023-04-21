import { type FC } from "react";
import Image from "next/image";
import logo from "../../assets/images/logo.svg";

import classes from "./PrimaryLogo.module.css";

export const PrimaryLogo: FC = () => (
  <div className={classes.primaryLogo}>
    <Image
      src={logo}
      width="335.69"
      height="84.38"
      alt="Логотип Нашего Урала"
      role="presentation"
    />
  </div>
);
