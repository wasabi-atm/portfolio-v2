import "outstatic/outstatic.css";

export const metadata = {
  title: "Outstatic Dashboard",
  description: "Outstatic CMS Dashboard",
};

export default function CmsLayout({ children }) {
  return (
    <html lang="en">
      <body id="outstatic" className="min-h-screen bg-white text-black dark:bg-zinc-950 dark:text-white">
        {children}
      </body>
    </html>
  );
}
