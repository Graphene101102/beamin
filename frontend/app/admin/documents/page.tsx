'use client';
import { useState } from 'react';
import BackButton from '@/app/components/common/BackButton';
import DocumentModal from '@/app/components/documents/DocumentModal';

interface Document {
  id: number;
  title: string;
  gradeId: number;
  gradeName: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
}

export default function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      title: "Tài liệu: Tổng quan văn học dân gian",
      gradeId: 6,
      gradeName: "Khối 6",
      fileUrl: "/documents/van-hoc-dan-gian.pdf",
      fileType: "PDF",
      fileSize: "2.5 MB",
      uploadDate: "2024-03-15"
    },
    // Thêm dữ liệu mẫu khác...
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);

  const handleOpenAddModal = () => {
    setEditingDocument(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (document: Document) => {
    setEditingDocument(document);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa tài liệu này?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  return (
    <div className="p-6">
      <BackButton />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý tài liệu</h1>
        <button 
          onClick={handleOpenAddModal}
          className="bg-green-200 px-4 py-2 rounded-lg hover:bg-green-300"
        >
          Thêm tài liệu
        </button>
      </div>

      <div className="bg-pink-50 rounded-lg p-6">
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên tài liệu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khối</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại file</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kích thước</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tải lên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc, index) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <a 
                      href={doc.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {doc.title}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.gradeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.fileType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.fileSize}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(doc.uploadDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEditModal(doc)}
                        className="p-2 bg-orange-200 rounded-lg hover:bg-orange-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
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
          Tổng số tài liệu: {documents.length}
        </div>
      </div>

      <DocumentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingDocument(null);
        }}
        onSubmit={(data) => {
          if (editingDocument) {
            setDocuments(documents.map(doc =>
              doc.id === editingDocument.id
                ? { ...data, id: doc.id }
                : doc
            ));
          } else {
            const newId = Math.max(...documents.map(d => d.id)) + 1;
            setDocuments([...documents, { ...data, id: newId }]);
          }
          setIsModalOpen(false);
          setEditingDocument(null);
        }}
        initialValue={editingDocument || undefined}
      />
    </div>
  );
}
