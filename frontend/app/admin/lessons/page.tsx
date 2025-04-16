'use client';
import { useState } from 'react';
import BackButton from '@/app/components/common/BackButton';
import LessonModal from '@/app/components/lessons/LessonModal';

interface Lesson {
  id: number;
  title: string;
  gradeId: number;
  gradeName: string;
  videoUrl: string;
  description: string;
  duration: string;
}

export default function LessonManagement() {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: 1,
      title: "Bài 1: Giới thiệu về Văn học dân gian",
      gradeId: 6,
      gradeName: "Khối 6",
      videoUrl: "https://example.com/video1.mp4",
      description: "Bài học về các thể loại văn học dân gian Việt Nam",
      duration: "45:00"
    },
    // Thêm các bài học mẫu khác...
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const handleOpenAddModal = () => {
    setEditingLesson(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLesson(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa bài học này?')) {
      setLessons(lessons.filter(lesson => lesson.id !== id));
    }
  };

  return (
    <div className="p-6">
      <BackButton />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý bài học</h1>
        <button 
          onClick={handleOpenAddModal}
          className="bg-green-200 px-4 py-2 rounded-lg hover:bg-green-300"
        >
          Thêm bài học
        </button>
      </div>

      <div className="bg-pink-50 rounded-lg p-6">
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên bài học</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khối</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời lượng</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lessons.map((lesson, index) => (
                <tr key={lesson.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{lesson.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lesson.gradeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lesson.duration}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    <a href={lesson.videoUrl} target="_blank" rel="noopener noreferrer">
                      Xem video
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEditModal(lesson)}
                        className="p-2 bg-orange-200 rounded-lg hover:bg-orange-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(lesson.id)}
                        className="p-2 bg-red-200 rounded-lg hover:bg-red-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-right mt-4">
          Tổng số bài học: {lessons.length}
        </div>
      </div>

      <LessonModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={(data) => {
          if (editingLesson) {
            setLessons(lessons.map(lesson =>
              lesson.id === editingLesson.id
                ? { ...data, id: lesson.id }
                : lesson
            ));
          } else {
            const newId = Math.max(...lessons.map(l => l.id)) + 1;
            setLessons([...lessons, { ...data, id: newId }]);
          }
          handleCloseModal();
        }}
        initialValue={editingLesson || undefined}
      />
    </div>
  );
}
