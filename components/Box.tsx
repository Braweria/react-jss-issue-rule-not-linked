import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { createUseStyles } from "react-jss";

type StylesProps = {
  fullWidth?: true | undefined;
  col: number;
};

type Theme = { [key: string]: string };

const useStyles = createUseStyles<string, StylesProps, Theme>((theme) => {
  return {
    box: {
      margin: (props) => (props.fullWidth ? 0 : "0 20px"),
      width: (props) =>
        typeof props.col === "number" && `calc((100vw / 12) * ${props.col})`,
    },
  };
});

type BoxProps = {
  children: ReactNode;
  col: number;
  fullWidth?: true | undefined;
} & HTMLAttributes<HTMLDivElement>;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, col, fullWidth, className, ...other }, ref): JSX.Element => {
    const classes = useStyles({ col, fullWidth });

    return (
      <div ref={ref} className={[classes.box, className].join(" ")} {...other}>
        {children}
      </div>
    );
  }
);
