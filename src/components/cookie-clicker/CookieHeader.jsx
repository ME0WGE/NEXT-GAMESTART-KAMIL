export default function Header({ title, description }) {
  return (
    <>
      <div className="text-center mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent h-px top-0"></div>
        <h1 className="text-6xl font-black text-gradient mb-6">{title}</h1>
        <p className="text-gray-300 text-xl font-light max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent h-px bottom-0"></div>
      </div>
    </>
  );
}
