'use client';

import { PlayCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function StudentHomePage() {
  const lessons = [
    {
      id: "1",
      title: "Bài 1 : CÂU CHUYỆN CỦA LỊCH SỬ",
      description: "Tìm hiểu về lịch sử và các câu chuyện thú vị",
      duration: "15 phút"
    },
    {
      id: "2",
      title: "Bài 2 : VẺ ĐẸP CỔ ĐIỂN",
      description: "Khám phá vẻ đẹp của nghệ thuật cổ điển",
      duration: "20 phút"
    },
    {
      id: "3",
      title: "Bài 3 : LỜI SÔNG NÚI",
      description: "Tìm hiểu về văn hóa và thiên nhiên",
      duration: "25 phút"
    },
    {
      id: "4",
      title: "Bài 4 : TIẾNG CƯỜI TRÀO PHÚNG TRONG THƠ",
      description: "Khám phá nghệ thuật trào phúng trong thơ ca",
      duration: "30 phút"
    },
    {
      id: "5",
      title: "Bài 5 : NHỮNG CÂU CHUYỆN HÀI",
      description: "Học về nghệ thuật kể chuyện hài hước",
      duration: "35 phút"
    }
  ];

  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Khóa học Văn học</h1>

          {/* Course Content */}
          <div className="bg-pink-50 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Nội dung khóa học</h2>
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <Link 
                  key={lesson.id}
                  href={`/video/${lesson.id}`}
                  className="block p-4 bg-white border rounded-lg hover:border-pink-500 cursor-pointer flex items-center transition-colors duration-300"
                >
                  <PlayCircleIcon className="h-5 w-5 text-pink-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{lesson.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Instructor Info */}
        <div className="bg-pink-50 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Giảng viên</h2>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <Image
                src="/image/minh.jpg"
                alt="Cô Thắm"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">CÔ Minh</h3>
            <div className="flex items-center gap-4 text-gray-600 mb-2">
              <span>Xinh gái nhất trái đất</span>
            </div>
            <button className="mt-4 w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700">
              Chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
