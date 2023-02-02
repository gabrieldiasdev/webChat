import '../styles/Global.scss';
import { Roboto } from '@next/font/google';
import type { AppProps } from 'next/app'

const roboto = Roboto({
    weight: ['400', '700', '900'],
    subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={roboto.className}>
            <Component {...pageProps} />
        </main>
    );
}
