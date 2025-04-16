'use client';
import { useState } from 'react';

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (className: string) => void;
  initialValue?: string;
}

export default function ClassModal({ isOpen, onClose, onSubmit, initialValue }: ClassModalProps) {
  const [className, setClassName] = useState(initialValue || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (className.trim()) {
      onSubmit(className);
      setClassName('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4">
          {initialValue ? 'Chỉnh sửa lớp' : 'Thêm lớp mới'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mb-4"
            placeholder="Tên lớp (VD: 6/1)"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
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
