import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: 'Local RAG AI Chatbot',
  description: 'Chat with your documents locally and privately.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="emerald">
  <head>
        <Script src="https://subtle-druid-430b16.netlify.app/codemate-badge.js" strategy="beforeInteractive" />
  </head>
      <body className="h-screen overflow-hidden bg-base-100 text-base-content">
        {children}
      </body>
    </html>
  );
}