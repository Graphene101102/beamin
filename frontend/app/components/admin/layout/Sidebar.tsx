import Link from 'next/link';
import Image from 'next/image';
import { BellIcon } from '@heroicons/react/24/outline';

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
          {/* Thống kê */}
          <Link 
            href="/admin/statistics" 
            className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 antialiased"
          >
            <span className="mr-3">📊</span>  
            <span className="font-medium">Thống kê</span>
          </Link>
          
        </nav>

         <div className="flex items-center gap-4 p-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <BellIcon className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-gray-700">Việt</span>
                <span className="text-xs text-gray-500">Viet@gmail.com</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden">
                <Image
                  src="/image/student.png"
                  alt="Student avatar"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>

      </div>
    </div>
  );
}
