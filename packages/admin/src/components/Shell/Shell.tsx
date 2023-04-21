import React, { type FC, type ReactNode } from "react";

import { TopBar } from "../TopBar";

import classes from "./Shell.module.css";

export const Shell: FC<{ title?: ReactNode; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className={classes.shell}>
      <TopBar />
      <div>
        {title && <h1>{title}</h1>}
        {children}
      </div>
    </div>
  );
};
