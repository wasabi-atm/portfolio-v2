import "../globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Wira Wibisana | Product Designer & Engineer",
  description: "Portfolio, editorial case studies, essays, and work by Wira Wibisana — Product Designer based in Bali.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/faviconneu.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function WebLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
        <div className="w-full min-h-screen flex flex-col lg:flex-row">
          <Sidebar />
          <div className="flex-1 lg:pl-[348px] flex flex-col min-h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
