import Link from 'next/link';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-white border-r shadow-sm">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Link href="/admin" className="block">
            <Image
              src="/image/logo.svg"
              alt="Logo"
              width={120}
              height={40}
              priority
              className="transform-gpu"
            />
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-4">
          {/* Quản lý học sinh */}
          <Link 
            href="/admin/grades" 
            className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 antialiased"
          >
            <span className="mr-3">👥</span>
            <span className="font-medium">Quản lý học sinh</span>
          </Link>

          {/* Quản lý bài học */}
          <Link 
            href="/admin/lessons" 
            className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 antialiased"
          >
            <span className="mr-3">📚</span>
            <span className="font-medium">Quản lý bài học</span>
          </Link>

          {/* Quản lý bài tập */}
          <Link 
            href="/admin/exercises" 
            className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 antialiased"
          >
            <span className="mr-3">✍️</span>
            <span className="font-medium">Quản lý bài tập</span>
          </Link>

          {/* Quản lý tài liệu */}
          <Link 
            href="/admin/documents" 
            className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 antialiased"
          >
            <span className="mr-3">📄</span>
            <span className="font-medium">Quản lý tài liệu</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
