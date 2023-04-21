import { type FC, type ReactNode } from 'react'
import { PrimaryLogo } from '../PrimaryLogo'

import classes from './Shell.module.css'

export const Shell: FC<{
  children: ReactNode
}> = ({ children }) => (
  <div className={classes.shell}>
    <header className={classes.header}>
      <PrimaryLogo />
    </header>
    <main className={classes.main}>
      {children}
    </main>
  </div>
)
