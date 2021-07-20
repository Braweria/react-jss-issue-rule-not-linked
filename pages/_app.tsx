import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "react-jss";

import { parkasaurusTheme } from "../utils/colors";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={parkasaurusTheme}>
        <Component {...pageProps} />
    </ThemeProvider>
  );
}
