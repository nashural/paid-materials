import { type FC, type CSSProperties } from 'react'
import cn from 'classnames'

import classes from './<FTName>.module.css'

export const <FTName>: FC<{ className?: string, style?: CSSProperties }> = ({ className, style }) => (
  <div className={cn(classes.<FTName | camelcase>, className)} style={style}>
    {null}
  </div>
)
