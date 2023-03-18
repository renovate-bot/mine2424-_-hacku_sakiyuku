import { ColorScheme, MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Head from 'next/head';
import { staticPath } from 'src/lib/$path';
import { AuthProvider } from 'src/application/ApplicationService/authContext';
import { mantineTheme } from '../lib/mantineTheme';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>さきゆく</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href={staticPath.images.sakiyuku_white_logo_png} />
      </Head>

      <MantineProvider theme={mantineTheme} withGlobalStyles withNormalizeCSS>
        <DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [0] }}>
          <RecoilRoot>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </RecoilRoot>
        </DatesProvider>
      </MantineProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
