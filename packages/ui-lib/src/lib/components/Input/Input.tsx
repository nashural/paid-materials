import { type FC, type CSSProperties } from "react";

export const Input: FC<{
  type?: "text" | "email";
  required?: boolean;
  name: string;
  placeholder?: string
  className?: string;
  style?: CSSProperties;
}> = ({ type = "text", required = false, name, placeholder, className, style }) => (
  <input
    type={type}
    name={name}
    required={required}
    placeholder={placeholder}
    className={className}
    style={{
      display: "block",
      ...style,
    }}
  />
);
