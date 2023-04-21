import { type FC, type CSSProperties, type ReactNode } from 'react'
import cn from 'classnames'

import classes from './<FTName>.module.css'

export const <FTName>: FC<{ className?: string, style?: CSSProperties, children: ReactNode }> = ({ className, style, children }) => (
  <div className={cn(classes.<FTName | camelcase>, className)} style={style}>
    {children}
  </div>
)
