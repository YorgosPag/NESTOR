
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'NESTOR-eco',
  description: 'AI-Powered Project Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans', inter.variable)}>
        <SidebarProvider>
            <div className="flex min-h-screen">
                <SidebarNav />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
