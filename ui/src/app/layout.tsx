import "@/styles/global.css";
import { ToastProviderWrapper } from "@/providers/ToastProviderWrapper";

export const metadata = {
  title: 'Contribute',
  description: 'Platform for organized decentralized collaboration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex items-center justify-center">
        <ToastProviderWrapper>
          {children}
        </ToastProviderWrapper>
      </body>
    </html>
  );
}