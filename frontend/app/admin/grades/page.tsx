/* eslint-disable @typescript-eslint/no-unused-vars */
// app/admin/grades/page.tsx
'use client';
import { useState } from 'react';
import GradeModal from '@/app/components/admin/grades/GradeModal';
import Link from 'next/link';
import BackButton from '@/app/components/common/BackButton';

interface Grade {
  id: number;
  name: string;
}

export default function GradesManagement() {
  const [grades, setGrades] = useState<Grade[]>([
    { id: 1, name: 'Khối 6' },
    { id: 2, name: 'Khối 7' },
    { id: 3, name: 'Khối 8' },
    { id: 4, name: 'Khối 9' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);

  const handleOpenAddModal = () => {
    setEditingGrade(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (grade: Grade) => {
    setEditingGrade(grade);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGrade(null);
  };

  const handleSubmit = (gradeName: string) => {
    if (editingGrade) {
      // Cập nhật khối
      setGrades(grades.map(grade => 
        grade.id === editingGrade.id 
          ? { ...grade, name: gradeName }
          : grade
      ));
    } else {
      // Thêm khối mới
      const newId = Math.max(...grades.map(g => g.id), 0) + 1;
      setGrades([...grades, { id: newId, name: gradeName }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa khối này?')) {
      setGrades(grades.filter(grade => grade.id !== id));
    }
  };

  return (
    <div className="p-6">
      <BackButton />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Khối</h1>
        <button 
          onClick={handleOpenAddModal}
          className="bg-green-200 px-4 py-2 rounded-lg hover:bg-green-300"
        >
          Thêm khối
        </button>
      </div>

      <div className="bg-pink-50 rounded-lg p-6">
        {grades.map((grade) => (
          <div key={grade.id} 
               className="bg-white mb-4 p-4 rounded-lg flex justify-between items-center">
            <Link 
              href={`/admin/grades/${grade.name.replace('Khối ', '')}`}
              className="hover:text-blue-600"
            >
              {grade.name}
            </Link>
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenEditModal(grade)}
                className="p-2 bg-orange-200 rounded-lg hover:bg-orange-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(grade.id)}
                className="p-2 bg-red-200 rounded-lg hover:bg-red-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        <div className="text-right mt-4">
          Tổng: {grades.length}
        </div>
      </div>

      <GradeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialValue={editingGrade?.name}
      />
    </div>
  );
}