export default function ExercisesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Bài tập</h1>
      </div>

      {/* Exercise List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((exercise) => (
          <div key={exercise} className="bg-pink-50 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Bài tập {exercise}</h3>
                  <p className="mt-1 text-sm text-gray-500">Bài tập về ...</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-pink-700 bg-pink-100 rounded-full">
                  15 câu hỏi
                </span>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 text-sm font-medium text-pink-600 hover:text-pink-700">
                  Làm bài →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
