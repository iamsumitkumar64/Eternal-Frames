import './globals.css'

import { StyledEngineProvider } from "@mui/material";
import StoreProvideLayout from '@/layout/store/provider';
import SnackBarLayout from '@/layout/snackbar/snackbar';
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <StyledEngineProvider injectFirst>
          <StoreProvideLayout >
            <SnackBarLayout>
              {children}
            </SnackBarLayout>
          </StoreProvideLayout >
        </StyledEngineProvider>
      </body>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
    </html >
  );
}
