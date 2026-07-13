import "../globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Wira Wibisana | Portfolio",
  description: "Product Designer & Frontend Engineer portfolio website",
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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
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
      <body className="min-h-full flex bg-zinc-50 dark:bg-zinc-950 text-black dark:text-white font-sans">
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
