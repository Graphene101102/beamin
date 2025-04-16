'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import StudentModal from '@/app/components/admin/students/StudentModal';
import BackButton from '@/app/components/common/BackButton';

interface Student {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: 'Nam' | 'Nữ';
  address: string;
  phoneNumber: string;
}

export default function StudentManagement() {
  const params = useParams();
  const gradeId = params.gradeId as string;
  const classId = params.classId as string;

  // Khởi tạo danh sách học sinh mẫu
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      dateOfBirth: '2010-01-15',
      gender: 'Nam',
      address: 'Hà Nội',
      phoneNumber: '0123456789'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      dateOfBirth: '2010-03-20',
      gender: 'Nữ',
      address: 'Hồ Chí Minh',
      phoneNumber: '0987654321'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      dateOfBirth: '2010-05-10',
      gender: 'Nam',
      address: 'Đà Nẵng',
      phoneNumber: '0369852147'
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      dateOfBirth: '2010-07-25',
      gender: 'Nữ',
      address: 'Hải Phòng',
      phoneNumber: '0741852963'
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      dateOfBirth: '2010-09-05',
      gender: 'Nam',
      address: 'Cần Thơ',
      phoneNumber: '0258963147'
    },
    {
      id: 6,
      name: 'Ngô Thị F',
      dateOfBirth: '2010-11-30',
      gender: 'Nữ',
      address: 'Huế',
      phoneNumber: '0147852369'
    },
    {
      id: 7,
      name: 'Đỗ Văn G',
      dateOfBirth: '2010-02-14',
      gender: 'Nam',
      address: 'Nha Trang',
      phoneNumber: '0963852741'
    },
    {
      id: 8,
      name: 'Vũ Thị H',
      dateOfBirth: '2010-04-22',
      gender: 'Nữ',
      address: 'Đà Lạt',
      phoneNumber: '0852147963'
    },
    {
      id: 9,
      name: 'Bùi Văn I',
      dateOfBirth: '2010-06-18',
      gender: 'Nam',
      address: 'Vũng Tàu',
      phoneNumber: '0741963852'
    },
    {
      id: 10,
      name: 'Lý Thị K',
      dateOfBirth: '2010-08-08',
      gender: 'Nữ',
      address: 'Quy Nhơn',
      phoneNumber: '0159753468'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleOpenAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleSubmit = (studentData: Omit<Student, 'id'>) => {
    if (editingStudent) {
      // Cập nhật học sinh
      setStudents(students.map(student => 
        student.id === editingStudent.id 
          ? { ...studentData, id: student.id }
          : student
      ));
    } else {
      // Thêm học sinh mới
      const newId = Math.max(...students.map(s => s.id), 0) + 1;
      setStudents([...students, { ...studentData, id: newId }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa học sinh này?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  return (
    <div className="p-6">
      <BackButton />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách học sinh - Lớp {gradeId}/{classId}</h1>
        <button 
          onClick={handleOpenAddModal}
          className="bg-green-200 px-4 py-2 rounded-lg hover:bg-green-300"
        >
          Thêm học sinh
        </button>
      </div>

      <div className="bg-pink-50 rounded-lg p-6">
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ và tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày sinh</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giới tính</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa chỉ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student, index) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(student.dateOfBirth).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEditModal(student)}
                        className="p-2 bg-orange-200 rounded-lg hover:bg-orange-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
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
          Tổng số học sinh: {students.length}
        </div>
      </div>

      <StudentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialValue={editingStudent || undefined}
      />
    </div>
  );
}
