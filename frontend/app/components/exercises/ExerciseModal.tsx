'use client';
import { useState, useEffect } from 'react';

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExerciseFormData) => void;
  initialValue?: Exercise;
}

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

interface ExerciseFormData {
  title: string;
  gradeId: number;
  gradeName: string;
  questions: Question[];
}

export default function ExerciseModal({ isOpen, onClose, onSubmit, initialValue }: ExerciseModalProps) {
  const [formData, setFormData] = useState<ExerciseFormData>({
    title: '',
    gradeId: 6,
    gradeName: 'Khối 6',
    questions: [
      {
        id: 1,
        content: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]
  });

  useEffect(() => {
    if (initialValue) {
      setFormData({
        title: initialValue.title,
        gradeId: initialValue.gradeId,
        gradeName: initialValue.gradeName,
        questions: initialValue.questions
      });
    } else {
      setFormData({
        title: '',
        gradeId: 6,
        gradeName: 'Khối 6',
        questions: [
          {
            id: 1,
            content: '',
            options: ['', '', '', ''],
            correctAnswer: 0
          }
        ]
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

  const handleQuestionChange = (questionId: number, field: keyof Question, value: string | number) => {
    setFormData({
      ...formData,
      questions: formData.questions.map(q => 
        q.id === questionId
          ? { ...q, [field]: value }
          : q
      )
    });
  };

  const handleOptionChange = (questionId: number, optionIndex: number, value: string) => {
    setFormData({
      ...formData,
      questions: formData.questions.map(q => 
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) => idx === optionIndex ? value : opt)
            }
          : q
      )
    });
  };

  const addQuestion = () => {
    const newId = Math.max(...formData.questions.map(q => q.id)) + 1;
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          id: newId,
          content: '',
          options: ['', '', '', ''],
          correctAnswer: 0
        }
      ]
    });
  };

  const removeQuestion = (questionId: number) => {
    if (formData.questions.length > 1) {
      setFormData({
        ...formData,
        questions: formData.questions.filter(q => q.id !== questionId)
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[800px] max-h-[90vh] overflow-y-auto shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4">
          {initialValue ? 'Chỉnh sửa bài tập' : 'Thêm bài tập mới'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên bài tập
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
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Câu hỏi
              </label>
              <button
                type="button"
                onClick={addQuestion}
                className="px-3 py-1 bg-green-200 rounded-lg hover:bg-green-300 text-sm"
              >
                Thêm câu hỏi
              </button>
            </div>

            {formData.questions.map((question, qIndex) => (
              <div key={question.id} className="mb-6 p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">Câu {qIndex + 1}</h3>
                  {formData.questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Xóa
                    </button>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Nhập câu hỏi"
                    value={question.content}
                    onChange={(e) => handleQuestionChange(question.id, 'content', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={question.correctAnswer === oIndex}
                        onChange={() => handleQuestionChange(question.id, 'correctAnswer', oIndex)}
                        required
                      />
                      <input
                        type="text"
                        className="flex-1 p-2 border rounded-lg"
                        placeholder={`Đáp án ${oIndex + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(question.id, oIndex, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
