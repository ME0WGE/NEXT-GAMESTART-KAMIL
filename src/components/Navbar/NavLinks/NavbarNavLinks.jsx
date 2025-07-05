import Link from "next/link";

export function NavbarNavLinksComponent({ name, url, toggleMenu }) {
  return (
    <Link
      href={url}
      key={name}
      onClick={toggleMenu}
      className="text-cyan-300 hover:text-cyan-400 hover:bg-slate-800/50 px-3 py-2 rounded-md text-sm font-mono tracking-wider transition-all duration-200 border border-transparent hover:border-cyan-400/50 relative group">
      {/* Neon glow effect */}
      <div className="absolute inset-0 bg-cyan-400/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      <span className="relative z-10">
        <span className="text-fuchsia-400">[</span>
        {name}
        <span className="text-purple-400">]</span>
      </span>
    </Link>
  );
}
export function NavbarNavLinks({ links, toggleMenu }) {
  // Vérification de sécurité pour éviter l'erreur si links est undefined
  if (!links || !Array.isArray(links)) {
    return null;
  }

  return (
    <>
      {links.map((link) => (
        <NavbarNavLinksComponent
          key={link.name}
          name={link.name}
          url={link.url}
          toggleMenu={toggleMenu}
        />
      ))}
    </>
  );
}
