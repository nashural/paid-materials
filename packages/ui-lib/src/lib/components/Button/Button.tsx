import { type FC, type CSSProperties, type ReactNode } from "react";

export const Button: FC<{
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}> = ({ href, style, className, children }) => {
  if (href) {
    return (
      <a
        href={href}
        className={className}
        style={{
          display: "inline-block",
          backgroundColor: "#0074a0",
          padding: "10px 20px",
          color: "#ffffff",
          textDecoration: "none",
          ...style,
        }}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        className={className}
        style={{
          display: "inline-block",
          backgroundColor: "#0074a0",
          padding: "10px 20px",
          color: "#ffffff",
          textDecoration: "none",
          fontSize: '1rem',
          border: 'none',
          cursor: 'pointer',
          ...style,
        }}
      >
        {children}
      </button>
    );
  }
};
