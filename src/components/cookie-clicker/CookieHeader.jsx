export default function Header({ title, description }) {
  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4">{title}</h1>
        <p className="text-gray-300 text-lg">{description}</p>
      </div>
    </>
  );
}
