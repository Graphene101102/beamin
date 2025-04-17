'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { use } from 'react';
import { useState } from 'react';

// Mock data - in real app this would come from API
const exerciseData = {
  "1": {
    title: "Bài 1 : CÂU CHUYỆN CỦA LỊCH SỬ",
    questions: [
      {
        id: 1,
        question: "Ai là tác giả của tác phẩm 'Tắt đèn'?",
        options: [
          { id: 'A', text: "Nam Cao" },
          { id: 'B', text: "Ngô Tất Tố" },
          { id: 'C', text: "Vũ Trọng Phụng" },
          { id: 'D', text: "Nguyễn Tuân" }
        ],
        correctAnswer: 'B'
      },
      {
        id: 2,
        question: "Tác phẩm 'Chí Phèo' thuộc thể loại nào?",
        options: [
          { id: 'A', text: "Truyện ngắn" },
          { id: 'B', text: "Tiểu thuyết" },
          { id: 'C', text: "Truyện dài" },
          { id: 'D', text: "Kịch" }
        ],
        correctAnswer: 'A'
      },
      {
        id: 3,
        question: "Nhân vật chính trong 'Số đỏ' là ai?",
        options: [
          { id: 'A', text: "Xuân Tóc Đỏ" },
          { id: 'B', text: "Chí Phèo" },
          { id: 'C', text: "Lão Hạc" },
          { id: 'D', text: "Chị Dậu" }
        ],
        correctAnswer: 'A'
      }
    ]
  },
  "2": {
    title: "Bài 2 : VẺ ĐẸP CỔ ĐIỂN",
    questions: [
      {
        id: 1,
        question: "Tác phẩm nào sau đây thuộc thể loại thơ Đường luật?",
        options: [
          { id: 'A', text: "Truyện Kiều" },
          { id: 'B', text: "Chinh phụ ngâm" },
          { id: 'C', text: "Cung oán ngâm khúc" },
          { id: 'D', text: "Qua đèo Ngang" }
        ],
        correctAnswer: 'D'
      },
      {
        id: 2,
        question: "Ai là tác giả của bài thơ 'Thu điếu'?",
        options: [
          { id: 'A', text: "Nguyễn Khuyến" },
          { id: 'B', text: "Hồ Xuân Hương" },
          { id: 'C', text: "Bà Huyện Thanh Quan" },
          { id: 'D', text: "Nguyễn Du" }
        ],
        correctAnswer: 'A'
      }
    ]
  }
};

export default function ExercisePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const exercise = exerciseData[id as keyof typeof exerciseData];
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    exercise.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    const finalScore = (correctCount / exercise.questions.length) * 10;
    setScore(finalScore);
    setIsSubmitted(true);
  };

  if (!exercise) {
    return (
      <div className="min-h-screen bg-pink-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-semibold text-gray-900">Bài tập không tồn tại</h1>
            <Link href="/" className="mt-4 inline-flex items-center text-pink-600 hover:text-pink-700">
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Link href="/" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-4">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Quay lại trang chủ
          </Link>

          <h1 className="text-2xl font-semibold text-gray-900 mb-6">{exercise.title}</h1>

          <div className="space-y-8">
            {exercise.questions.map((question) => (
              <div key={question.id} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Câu {question.id}: {question.question}
                </h3>
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                        answers[question.id] === option.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300'
                      } ${
                        isSubmitted && option.id === question.correctAnswer
                          ? 'bg-green-50 border-green-500'
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.id}
                        checked={answers[question.id] === option.id}
                        onChange={() => handleAnswerSelect(question.id, option.id)}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                        disabled={isSubmitted}
                      />
                      <span className="ml-3 text-gray-700">{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              className="mt-8 w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Nộp bài
            </button>
          ) : (
            <div className="mt-8 p-4 bg-pink-50 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Kết quả</h3>
              <p className="text-3xl font-bold text-pink-600">{score?.toFixed(1)} điểm</p>
              <p className="text-gray-600 mt-2">
                Bạn đã trả lời đúng {score ? (score / 10 * exercise.questions.length).toFixed(0) : 0}/
                {exercise.questions.length} câu
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 