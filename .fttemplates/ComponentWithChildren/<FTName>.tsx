import { type FC, type ReactNode } from 'react'

import classes from './<FTName>.module.css'

export const <FTName>: FC<{
  children: ReactNode
}> = ({ children }) => (
  <div className={classes.<FTName | camelcase>}>
    {children}
  </div>
)
