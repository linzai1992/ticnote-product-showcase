import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          TicNote Product Showcase
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          TicNote AI助手产品展示系统
        </p>
        <Link 
          href="/presentation" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          进入演示模式
        </Link>
      </div>
    </div>
  );
}
