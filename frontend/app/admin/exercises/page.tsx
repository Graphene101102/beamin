'use client';
import { useState } from 'react';
import BackButton from '@/app/components/common/BackButton';
import ExerciseModal from '@/app/components/admin/exercises/ExerciseModal';

interface Exercise {
  id: number;
  title: string;
  gradeId: number;
  gradeName: string;
  questions: Question[];
}

interface Question {
  id: number;
  content: string;
  options: string[];
  correctAnswer: number;
}

export default function ExerciseManagement() {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 1,
      title: "Bài tập: Tìm hiểu về Ca dao",
      gradeId: 6,
      gradeName: "Khối 6",
      questions: [
        {
          id: 1,
          content: "Ca dao là gì?",
          options: [
            "Thơ được viết bởi các nhà thơ nổi tiếng",
            "Những câu hát dân gian được lưu truyền trong dân gian",
            "Những bài thơ hiện đại",
            "Những bài hát được sáng tác gần đây"
          ],
          correctAnswer: 1
        },
        // Thêm các câu hỏi khác...
      ]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  // ... các hàm xử lý tương tự như LessonManagement

  return (
    <div className="p-6">
      <BackButton />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý bài tập</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-200 px-4 py-2 rounded-lg hover:bg-green-300"
        >
          Thêm bài tập
        </button>
      </div>

      <div className="bg-pink-50 rounded-lg p-6">
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên bài tập</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khối</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số câu hỏi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exercises.map((exercise, index) => (
                <tr key={exercise.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{exercise.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exercise.gradeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exercise.questions.length}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingExercise(exercise);
                          setIsModalOpen(true);
                        }}
                        className="p-2 bg-orange-200 rounded-lg hover:bg-orange-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Bạn có chắc muốn xóa bài tập này?')) {
                            setExercises(exercises.filter(e => e.id !== exercise.id));
                          }
                        }}
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
          Tổng số bài tập: {exercises.length}
        </div>
      </div>

      <ExerciseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingExercise(null);
        }}
        onSubmit={(data) => {
          if (editingExercise) {
            setExercises(exercises.map(exercise =>
              exercise.id === editingExercise.id
                ? { ...data, id: exercise.id }
                : exercise
            ));
          } else {
            const newId = Math.max(...exercises.map(e => e.id)) + 1;
            setExercises([...exercises, { ...data, id: newId }]);
          }
          setIsModalOpen(false);
          setEditingExercise(null);
        }}
        initialValue={editingExercise || undefined}
      />
    </div>
  );
}
