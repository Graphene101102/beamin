'use client';
import { useState, useEffect } from 'react';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DocumentFormData) => void;
  initialValue?: Document;
}

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

interface DocumentFormData {
  title: string;
  gradeId: number;
  gradeName: string;
  fileUrl: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
}

export default function DocumentModal({ isOpen, onClose, onSubmit, initialValue }: DocumentModalProps) {
  const [formData, setFormData] = useState<DocumentFormData>({
    title: '',
    gradeId: 6,
    gradeName: 'Khối 6',
    fileUrl: '',
    fileType: '',
    fileSize: '',
    uploadDate: new Date().toISOString().split('T')[0]
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialValue) {
      setFormData({
        title: initialValue.title,
        gradeId: initialValue.gradeId,
        gradeName: initialValue.gradeName,
        fileUrl: initialValue.fileUrl,
        fileType: initialValue.fileType,
        fileSize: initialValue.fileSize,
        uploadDate: initialValue.uploadDate
      });
    } else {
      setFormData({
        title: '',
        gradeId: 6,
        gradeName: 'Khối 6',
        fileUrl: '',
        fileType: '',
        fileSize: '',
        uploadDate: new Date().toISOString().split('T')[0]
      });
    }
    setSelectedFile(null);
  }, [initialValue, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Trong thực tế, bạn sẽ cần upload file lên server và lấy URL
      setFormData({
        ...formData,
        fileUrl: URL.createObjectURL(file),
        fileType: file.type.split('/')[1].toUpperCase(),
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      });
    }
  };

  const handleGradeChange = (gradeId: number) => {
    setFormData({
      ...formData,
      gradeId,
      gradeName: `Khối ${gradeId}`
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[600px] shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4">
          {initialValue ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên tài liệu
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Khối
            </label>
            <select
              className="w-full p-2 border rounded-lg"
              value={formData.gradeId}
              onChange={(e) => handleGradeChange(Number(e.target.value))}
              required
            >
              {[6, 7, 8, 9].map((grade) => (
                <option key={grade} value={grade}>
                  Khối {grade}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tài liệu
            </label>
            <div className="flex gap-2">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                className="w-full p-2 border rounded-lg"
                onChange={handleFileChange}
                required={!initialValue}
              />
              {(formData.fileUrl || selectedFile) && (
                <button
                  type="button"
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => window.open(formData.fileUrl, '_blank')}
                >
                  Xem
                </button>
              )}
            </div>
            {selectedFile && (
              <div className="mt-2 text-sm text-gray-600">
                Loại file: {formData.fileType} - Kích thước: {formData.fileSize}
              </div>
            )}
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
