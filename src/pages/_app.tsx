import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'antd/dist/reset.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ConfigProvider as AntdConfigProvider } from 'antd';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AntdConfigProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AntdConfigProvider>
  );
}
