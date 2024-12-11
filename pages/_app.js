
import "bootstrap/dist/css/bootstrap.min.css";
import '@/styles/globals.css';
import { SWRConfig } from 'swr';
import Layout from '@/components/Layout';
import RouteGuard from "@/components/routeGuard";

function MyApp({ Component, pageProps }) {
  return (
    <RouteGuard>
      <Layout>
        <SWRConfig
          value={{
            fetcher: async (url) => {
              const res = await fetch(url);

              // Check if response is not in the 200-299 range
              if (!res.ok) {
                const error = new Error('An error occurred while fetching the data.');
                error.info = await res.json();
                error.status = res.status;
                throw error;
              }

              return res.json();
            },
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </Layout>
    </RouteGuard>
  );
}

export default MyApp;
