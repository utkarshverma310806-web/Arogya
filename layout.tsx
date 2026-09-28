import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ArogyaAI – Virtual Health Assistant & Telemedicine Portal',
  description:
    'Anti-Gravity inspired futuristic health assistant app featuring AI symptom triage, specialist doctor booking, local storage medicine reminders, and preventive wellness guides.',
  keywords: [
    'ArogyaAI',
    'Virtual Health Assistant',
    'Telemedicine',
    'AI Symptom Checker',
    'Medicine Reminder',
    'Doctor Appointment Booking',
    'Glassmorphism Health UI',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col anti-gravity-bg transition-colors duration-300">
        <AppProvider>
          <AuthProvider>
            {/* Background Glow Orbs */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
            <div className="fixed bottom-10 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse-glow" />

            {/* Global Navigation Bar */}
            <Navbar />

            {/* Page Content Container */}
            <main className="flex-1 w-full">{children}</main>

            {/* Global Footer */}
            <Footer />
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
