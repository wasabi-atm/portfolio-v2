export default function CmsLayout({ children }) {
  return (
    <div id="outstatic" className="min-h-screen bg-white text-black dark:bg-zinc-950 dark:text-white">
      {children}
    </div>
  );
}
