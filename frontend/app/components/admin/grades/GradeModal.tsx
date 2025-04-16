'use client';
import { useState } from 'react';

interface GradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (gradeName: string) => void;
  initialValue?: string;
}

export default function GradeModal({ isOpen, onClose, onSubmit, initialValue }: GradeModalProps) {
  const [gradeName, setGradeName] = useState(initialValue || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gradeName.trim()) {
      onSubmit(gradeName);
      setGradeName('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4">
          {initialValue ? 'Chỉnh sửa khối' : 'Thêm khối mới'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mb-4"
            placeholder="Tên khối"
            value={gradeName}
            onChange={(e) => setGradeName(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {initialValue ? 'Cập nhật' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
