import "@/styles/global.css";
import { ToastProviderWrapper } from "@/providers/ToastProviderWrapper";
import { HeaderMenu } from "@/components/ui/HeaderMenu";

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
      <body className="h-full flex flex-col">
      <HeaderMenu />
        {/* Add HeaderMenu at the top */}
        <div className="flex flex-1 items-center justify-center">
          <ToastProviderWrapper>
            {children}
          </ToastProviderWrapper>
        </div>
      </body>
    </html>
  );
}