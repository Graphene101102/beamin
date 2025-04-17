'use client';

import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const exercises = [
  {
    id: "1",
    title: "Bài 1 : CÂU CHUYỆN CỦA LỊCH SỬ",
    description: "Bài tập trắc nghiệm về các tác phẩm văn học hiện đại",
    totalQuestions: 3,
    duration: "15 phút"
  },
  {
    id: "2",
    title: "Bài 2 : VẺ ĐẸP CỔ ĐIỂN",
    description: "Bài tập trắc nghiệm về thơ ca cổ điển",
    totalQuestions: 2,
    duration: "10 phút"
  }
];

export default function ExercisesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Bài tập</h1>
      </div>

      {/* Exercise List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercises) => (
          <Link
            key={exercises.id}
            href={`/exercises/${exercises.id}`}
            className="block bg-pink-50 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{exercises.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{exercises.description}</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-pink-700 bg-pink-100 rounded-full">
                  {exercises.totalQuestions} câu hỏi
                </span>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <span className="text-sm text-gray-500">{exercises.duration}</span>
                <div className="flex items-center text-pink-600 hover:text-pink-700">
                  <span className="text-sm font-medium">Làm bài</span>
                  <DocumentTextIcon className="h-5 w-5 ml-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
