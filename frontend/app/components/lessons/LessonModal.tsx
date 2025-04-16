'use client';
import { useState, useEffect } from 'react';

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LessonFormData) => void;
  initialValue?: Lesson;
}

interface Lesson {
  id: number;
  title: string;
  gradeId: number;
  gradeName: string;
  videoUrl: string;
  description: string;
  duration: string;
}

interface LessonFormData {
  title: string;
  gradeId: number;
  gradeName: string;
  videoUrl: string;
  description: string;
  duration: string;
}

export default function LessonModal({ isOpen, onClose, onSubmit, initialValue }: LessonModalProps) {
  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    gradeId: 6,
    gradeName: 'Khối 6',
    videoUrl: '',
    description: '',
    duration: ''
  });

  useEffect(() => {
    if (initialValue) {
      setFormData({
        title: initialValue.title,
        gradeId: initialValue.gradeId,
        gradeName: initialValue.gradeName,
        videoUrl: initialValue.videoUrl,
        description: initialValue.description,
        duration: initialValue.duration
      });
    } else {
      setFormData({
        title: '',
        gradeId: 6,
        gradeName: 'Khối 6',
        videoUrl: '',
        description: '',
        duration: ''
      });
    }
  }, [initialValue, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
          {initialValue ? 'Chỉnh sửa bài học' : 'Thêm bài học mới'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên bài học
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
              Video
            </label>
            <div className="flex gap-2">
              <input
                type="file"
                accept="video/*"
                className="w-full p-2 border rounded-lg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Trong thực tế, bạn sẽ cần upload file lên server và lấy URL
                    setFormData({ ...formData, videoUrl: URL.createObjectURL(file) });
                  }
                }}
              />
              {formData.videoUrl && (
                <button
                  type="button"
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => window.open(formData.videoUrl, '_blank')}
                >
                  Xem
                </button>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thời lượng (phút)
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="VD: 45:00"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả
            </label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
