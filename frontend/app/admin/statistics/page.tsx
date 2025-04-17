'use client';

import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type CompletionData = {
  total: number;
  completed: number;
  students: {
    name: string;
    completed: boolean;
  }[];
};

type ClassData = {
  [exercise: string]: CompletionData;
};

type StatisticsData = {
  [className: string]: ClassData;
};

export default function StatisticsPage() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const classes = ["Lớp 8-1", "Lớp 8-2", "Lớp 8-3"] as const;
  const exercises = [
    "Bài tập 1", "Bài tập 2", "Bài tập 3", "Bài tập 4", "Bài tập 5",
    "Bài tập 6", "Bài tập 7", "Bài tập 8", "Bài tập 9", "Bài tập 10"
  ] as const;
  
  // Example data - in real app this would come from API
  const completionData: StatisticsData = {
    "Lớp 8-1": {
      "Bài tập 1": { 
        total: 40, 
        completed: 35,
        students: [
          { name: "Nguyễn Văn A", completed: true },
          { name: "Trần Thị B", completed: true },
          { name: "Lê Văn C", completed: false },
          { name: "Phạm Thị D", completed: true },
          { name: "Hoàng Văn E", completed: true },
        ]
      },
      "Bài tập 2": { 
        total: 40, 
        completed: 38,
        students: [
          { name: "Nguyễn Văn A", completed: true },
          { name: "Trần Thị B", completed: true },
          { name: "Lê Văn C", completed: true },
          { name: "Phạm Thị D", completed: true },
          { name: "Hoàng Văn E", completed: true },
        ]
      },
      "Bài tập 3": { 
        total: 40, 
        completed: 30,
        students: [
          { name: "Nguyễn Văn A", completed: true },
          { name: "Trần Thị B", completed: true },
          { name: "Lê Văn C", completed: false },
          { name: "Phạm Thị D", completed: true },
          { name: "Hoàng Văn E", completed: false },
        ]
      },
      "Bài tập 4": { 
        total: 40, 
        completed: 25,
        students: [
          { name: "Nguyễn Văn A", completed: true },
          { name: "Trần Thị B", completed: true },
          { name: "Lê Văn C", completed: false },
          { name: "Phạm Thị D", completed: false },
          { name: "Hoàng Văn E", completed: false },
        ]
      },
      "Bài tập 5": { 
        total: 40, 
        completed: 20,
        students: [
          { name: "Nguyễn Văn A", completed: true },
          { name: "Trần Thị B", completed: true },
          { name: "Lê Văn C", completed: false },
          { name: "Phạm Thị D", completed: false },
          { name: "Hoàng Văn E", completed: false },
        ]
      },
      "Bài tập 6": { 
        total: 40, 
        completed: 15,
        students: [
          { name: "Nguyễn Văn A", completed: true },
          { name: "Trần Thị B", completed: false },
          { name: "Lê Văn C", completed: false },
          { name: "Phạm Thị D", completed: false },
          { name: "Hoàng Văn E", completed: false },
        ]
      },
      "Bài tập 7": { 
        total: 40, 
        completed: 10,
        students: [
          { name: "Nguyễn Văn A", completed: true },
          { name: "Trần Thị B", completed: false },
          { name: "Lê Văn C", completed: false },
          { name: "Phạm Thị D", completed: false },
          { name: "Hoàng Văn E", completed: false },
        ]
      },
      "Bài tập 8": { 
        total: 40, 
        completed: 5,
        students: [
          { name: "Nguyễn Văn A", completed: true },
          { name: "Trần Thị B", completed: false },
          { name: "Lê Văn C", completed: false },
          { name: "Phạm Thị D", completed: false },
          { name: "Hoàng Văn E", completed: false },
        ]
      },
      "Bài tập 9": { 
        total: 40, 
        completed: 0,
        students: [
          { name: "Nguyễn Văn A", completed: false },
          { name: "Trần Thị B", completed: false },
          { name: "Lê Văn C", completed: false },
          { name: "Phạm Thị D", completed: false },
          { name: "Hoàng Văn E", completed: false },
        ]
      },
      "Bài tập 10": { 
        total: 40, 
        completed: 0,
        students: [
          { name: "Nguyễn Văn A", completed: false },
          { name: "Trần Thị B", completed: false },
          { name: "Lê Văn C", completed: false },
          { name: "Phạm Thị D", completed: false },
          { name: "Hoàng Văn E", completed: false },
        ]
      }
    },
    "Lớp 8-2": {
      "Bài tập 1": { 
        total: 38, 
        completed: 30,
        students: [
          { name: "Nguyễn Thị F", completed: true },
          { name: "Trần Văn G", completed: true },
          { name: "Lê Thị H", completed: true },
          { name: "Phạm Văn I", completed: false },
          { name: "Hoàng Thị K", completed: false },
        ]
      },
      "Bài tập 2": { 
        total: 38, 
        completed: 35,
        students: [
          { name: "Nguyễn Thị F", completed: true },
          { name: "Trần Văn G", completed: true },
          { name: "Lê Thị H", completed: true },
          { name: "Phạm Văn I", completed: true },
          { name: "Hoàng Thị K", completed: true },
        ]
      },
      "Bài tập 3": { 
        total: 38, 
        completed: 28,
        students: [
          { name: "Nguyễn Thị F", completed: true },
          { name: "Trần Văn G", completed: true },
          { name: "Lê Thị H", completed: true },
          { name: "Phạm Văn I", completed: false },
          { name: "Hoàng Thị K", completed: false },
        ]
      },
      "Bài tập 4": { 
        total: 38, 
        completed: 22,
        students: [
          { name: "Nguyễn Thị F", completed: true },
          { name: "Trần Văn G", completed: true },
          { name: "Lê Thị H", completed: false },
          { name: "Phạm Văn I", completed: false },
          { name: "Hoàng Thị K", completed: false },
        ]
      },
      "Bài tập 5": { 
        total: 38, 
        completed: 18,
        students: [
          { name: "Nguyễn Thị F", completed: true },
          { name: "Trần Văn G", completed: true },
          { name: "Lê Thị H", completed: false },
          { name: "Phạm Văn I", completed: false },
          { name: "Hoàng Thị K", completed: false },
        ]
      },
      "Bài tập 6": { 
        total: 38, 
        completed: 13,
        students: [
          { name: "Nguyễn Thị F", completed: true },
          { name: "Trần Văn G", completed: false },
          { name: "Lê Thị H", completed: false },
          { name: "Phạm Văn I", completed: false },
          { name: "Hoàng Thị K", completed: false },
        ]
      },
      "Bài tập 7": { 
        total: 38, 
        completed: 8,
        students: [
          { name: "Nguyễn Thị F", completed: true },
          { name: "Trần Văn G", completed: false },
          { name: "Lê Thị H", completed: false },
          { name: "Phạm Văn I", completed: false },
          { name: "Hoàng Thị K", completed: false },
        ]
      },
      "Bài tập 8": { 
        total: 38, 
        completed: 3,
        students: [
          { name: "Nguyễn Thị F", completed: true },
          { name: "Trần Văn G", completed: false },
          { name: "Lê Thị H", completed: false },
          { name: "Phạm Văn I", completed: false },
          { name: "Hoàng Thị K", completed: false },
        ]
      },
      "Bài tập 9": { 
        total: 38, 
        completed: 0,
        students: [
          { name: "Nguyễn Thị F", completed: false },
          { name: "Trần Văn G", completed: false },
          { name: "Lê Thị H", completed: false },
          { name: "Phạm Văn I", completed: false },
          { name: "Hoàng Thị K", completed: false },
        ]
      },
      "Bài tập 10": { 
        total: 38, 
        completed: 0,
        students: [
          { name: "Nguyễn Thị F", completed: false },
          { name: "Trần Văn G", completed: false },
          { name: "Lê Thị H", completed: false },
          { name: "Phạm Văn I", completed: false },
          { name: "Hoàng Thị K", completed: false },
        ]
      }
    },
    "Lớp 8-3": {
      "Bài tập 1": { 
        total: 42, 
        completed: 38,
        students: [
          { name: "Nguyễn Văn L", completed: true },
          { name: "Trần Thị M", completed: true },
          { name: "Lê Văn N", completed: true },
          { name: "Phạm Thị O", completed: true },
          { name: "Hoàng Văn P", completed: false },
        ]
      },
      "Bài tập 2": { 
        total: 42, 
        completed: 40,
        students: [
          { name: "Nguyễn Văn L", completed: true },
          { name: "Trần Thị M", completed: true },
          { name: "Lê Văn N", completed: true },
          { name: "Phạm Thị O", completed: true },
          { name: "Hoàng Văn P", completed: true },
        ]
      },
      "Bài tập 3": { 
        total: 42, 
        completed: 35,
        students: [
          { name: "Nguyễn Văn L", completed: true },
          { name: "Trần Thị M", completed: true },
          { name: "Lê Văn N", completed: true },
          { name: "Phạm Thị O", completed: true },
          { name: "Hoàng Văn P", completed: false },
        ]
      },
      "Bài tập 4": { 
        total: 42, 
        completed: 30,
        students: [
          { name: "Nguyễn Văn L", completed: true },
          { name: "Trần Thị M", completed: true },
          { name: "Lê Văn N", completed: true },
          { name: "Phạm Thị O", completed: false },
          { name: "Hoàng Văn P", completed: false },
        ]
      },
      "Bài tập 5": { 
        total: 42, 
        completed: 25,
        students: [
          { name: "Nguyễn Văn L", completed: true },
          { name: "Trần Thị M", completed: true },
          { name: "Lê Văn N", completed: false },
          { name: "Phạm Thị O", completed: false },
          { name: "Hoàng Văn P", completed: false },
        ]
      },
      "Bài tập 6": { 
        total: 42, 
        completed: 20,
        students: [
          { name: "Nguyễn Văn L", completed: true },
          { name: "Trần Thị M", completed: true },
          { name: "Lê Văn N", completed: false },
          { name: "Phạm Thị O", completed: false },
          { name: "Hoàng Văn P", completed: false },
        ]
      },
      "Bài tập 7": { 
        total: 42, 
        completed: 15,
        students: [
          { name: "Nguyễn Văn L", completed: true },
          { name: "Trần Thị M", completed: false },
          { name: "Lê Văn N", completed: false },
          { name: "Phạm Thị O", completed: false },
          { name: "Hoàng Văn P", completed: false },
        ]
      },
      "Bài tập 8": { 
        total: 42, 
        completed: 10,
        students: [
          { name: "Nguyễn Văn L", completed: true },
          { name: "Trần Thị M", completed: false },
          { name: "Lê Văn N", completed: false },
          { name: "Phạm Thị O", completed: false },
          { name: "Hoàng Văn P", completed: false },
        ]
      },
      "Bài tập 9": { 
        total: 42, 
        completed: 5,
        students: [
          { name: "Nguyễn Văn L", completed: true },
          { name: "Trần Thị M", completed: false },
          { name: "Lê Văn N", completed: false },
          { name: "Phạm Thị O", completed: false },
          { name: "Hoàng Văn P", completed: false },
        ]
      },
      "Bài tập 10": { 
        total: 42, 
        completed: 0,
        students: [
          { name: "Nguyễn Văn L", completed: false },
          { name: "Trần Thị M", completed: false },
          { name: "Lê Văn N", completed: false },
          { name: "Phạm Thị O", completed: false },
          { name: "Hoàng Văn P", completed: false },
        ]
      }
    }
  };

  const handleProgressClick = (className: string, exercise: string) => {
    setSelectedClass(className);
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
    setSelectedExercise(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChartBarIcon className="h-6 w-6 text-pink-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Thống kê hoàn thành bài tập</h1>
        </div>
      </div>

      {/* Statistics Table */}
      <div className="relative">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-pink-50">
                  <tr>
                    <th className="sticky left-0 z-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-pink-50 w-[200px]">
                      Lớp
                    </th>
                    {exercises.map((exercise) => (
                      <th key={exercise} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                        {exercise}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classes.map((className) => (
                    <tr key={className} className="hover:bg-pink-50">
                      <td className="sticky left-0 z-10 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-white w-[200px]">
                        {className}
                      </td>
                      {exercises.map((exercise) => {
                        const data = completionData[className][exercise];
                        const percentage = Math.round((data.completed / data.total) * 100);
                        return (
                          <td key={exercise} className="px-6 py-4 whitespace-nowrap text-sm text-center min-w-[200px]">
                            <div className="flex flex-col items-center">
                              <span className="text-gray-900 font-medium">{data.completed}/{data.total}</span>
                              <div 
                                className="w-full bg-gray-200 rounded-full h-2.5 mt-1 cursor-pointer"
                                onClick={() => handleProgressClick(className, exercise)}
                              >
                                <div 
                                  className={`h-2.5 rounded-full ${
                                    percentage >= 80 ? 'bg-green-500' :
                                    percentage >= 50 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500 mt-1">{percentage}%</span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>≥ 80% hoàn thành</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>50-79% hoàn thành</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>&lt; 50% hoàn thành</span>
        </div>
      </div>

      {/* Student List Modal */}
      {isModalOpen && selectedClass && selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Danh sách học sinh - {selectedClass} - {selectedExercise}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {completionData[selectedClass][selectedExercise].students.map((student, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    student.completed ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <span className="text-gray-900">{student.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {student.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}