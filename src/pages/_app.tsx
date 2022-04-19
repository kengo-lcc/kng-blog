import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto max-w-prose">
      <header className="border-b border-gray-300 py-8">
        <Link href="/">
          <a className="text-5xl font-bold">
            <h1>microCMSテストブログ</h1>
          </a>
        </Link>
      </header>
      <main className="my-8">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
