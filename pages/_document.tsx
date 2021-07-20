
import jss from 'jss';
import jssCamelCase from 'jss-plugin-camel-case';
import jssGlobal from 'jss-plugin-global';
import jssVendorPrefix from 'jss-plugin-vendor-prefixer';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext, DocumentProps } from 'next/document';
import normalize from 'normalize-jss';
import { SheetsRegistry, JssProvider, createGenerateId } from 'react-jss';

jss.setup({
  plugins: [jssGlobal(), jssCamelCase(), jssVendorPrefix()],
});
const normalizeJss = jss.createStyleSheet(normalize, { link: true });

export default function ParkasaurusDocument(props: DocumentProps): JSX.Element {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/zao8law.css" />
        <meta content="Wiktoria Mielcarek" name="author" />
        {props.styles}
      </Head>
      <body style={{ backgroundColor: '#f8f0e3' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

async function getInitialProps(ctx: DocumentContext) {
  const sheets = new SheetsRegistry();
  const generateId = createGenerateId();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <JssProvider registry={sheets} generateId={generateId}>
            <App {...props} />
          </JssProvider>
        ),
    });

  const initialProps = await NextDocument.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style type="text/css" data-meta="jss-ssr" id="server-side-rendering">
          {sheets.toString()}
        </style>
        <style type="text/css" data-meta="normalize" id="normalize-jss">
          {normalizeJss.toString()}
        </style>
      </>
    ),
  };
}

ParkasaurusDocument.renderDocument = NextDocument.renderDocument;
ParkasaurusDocument.getInitialProps = getInitialProps;
