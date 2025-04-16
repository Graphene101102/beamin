import Link from 'next/link';
import Image from 'next/image';
import { BellIcon } from '@heroicons/react/24/outline';

export default function StudentHeader() {
  return (
    <header className="flex flex-col items-center justify-center bg-white shadow-sm h-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/image/logo.svg"
              alt="Logo"
              width={120}
              height={40}
              priority
              className="transform-gpu"
            />
          </Link>
          
            <div className="flex justify-center">
              <nav className="flex gap-8">
                <Link href="/" className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">
                  BÀI HỌC
                </Link>
                <Link href="/exercises" className="px-4 py-2 text-gray-500 hover:text-gray-700">
                  BÀI TẬP
                </Link>
                <Link href="/documents" className="px-4 py-2 text-gray-500 hover:text-gray-700">
                  TÀI LIỆU
                </Link>
              </nav>
            </div>


          {/* User Menu */}
          <div className="flex items-center gap-4">
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
    </header>
  );
}
