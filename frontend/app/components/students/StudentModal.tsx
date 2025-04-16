'use client';
import { useState, useEffect } from 'react';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: Omit<Student, 'id'>) => void;
  initialValue?: Student;
}

interface Student {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: 'Nam' | 'Nữ';
  address: string;
  phoneNumber: string;
}

export default function StudentModal({ isOpen, onClose, onSubmit, initialValue }: StudentModalProps) {
  const [student, setStudent] = useState<Omit<Student, 'id'>>({
    name: '',
    dateOfBirth: '',
    gender: 'Nam',
    address: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (initialValue) {
      setStudent({
        name: initialValue.name,
        dateOfBirth: initialValue.dateOfBirth,
        gender: initialValue.gender,
        address: initialValue.address,
        phoneNumber: initialValue.phoneNumber
      });
    } else {
      setStudent({
        name: '',
        dateOfBirth: '',
        gender: 'Nam',
        address: '',
        phoneNumber: ''
      });
    }
  }, [initialValue, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(student);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4">
          {initialValue ? 'Chỉnh sửa học sinh' : 'Thêm học sinh mới'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg"
              value={student.dateOfBirth}
              onChange={(e) => setStudent({ ...student, dateOfBirth: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={student.gender}
              onChange={(e) => setStudent({ ...student, gender: e.target.value as 'Nam' | 'Nữ' })}
              required
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={student.address}
              onChange={(e) => setStudent({ ...student, address: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input
              type="tel"
              className="w-full p-2 border rounded-lg"
              value={student.phoneNumber}
              onChange={(e) => setStudent({ ...student, phoneNumber: e.target.value })}
              required
            />
          </div>

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
