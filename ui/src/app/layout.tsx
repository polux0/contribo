import "@/styles/global.css";
import { ToastProviderWrapper } from "@/providers/ToastProviderWrapper";
import { HeaderMenu } from "@/components/ui/HeaderMenu";

// Wallet related modals
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import Web3ModalProvider from "@/context";
// Wallet related modals

export const metadata = {
  title: 'Contribute',
  description: 'Platform for organized decentralized collaboration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col">
      <HeaderMenu />
        {/* Add HeaderMenu at the top */}
        <div className="flex flex-1 items-center justify-center">
          <ToastProviderWrapper>
            <Web3ModalProvider initialState={initialState}>
              {children}
            </Web3ModalProvider>
          </ToastProviderWrapper>
        </div>
      </body>
    </html>
  );
}