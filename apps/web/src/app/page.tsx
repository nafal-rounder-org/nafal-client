export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#FFFFF5]">
      <h1 className="text-4xl font-bold mb-8">NAFAL</h1>
      <p className="text-lg text-gray-600 mb-8">Home</p>
      <a 
        href="/login" 
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        로그인 페이지
      </a>
    </div>
  );
}
