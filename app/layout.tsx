import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getAvailableCSVFiles } from '@/lib/csv-parser';
import { DashboardNav } from '@/components/dashboard-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CSV Data Dashboard',
  description: 'Modern dashboard for viewing CSV data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const availableFiles = getAvailableCSVFiles();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <div className="w-64 border-r bg-gray-50/40 p-4">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">HRlytics</h1>
              <p className="text-sm text-gray-500">Data Storage</p>
            </div>
            <DashboardNav availableFiles={availableFiles} />
          </div>
          <div className="flex-1 overflow-auto">
            <main className="p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}