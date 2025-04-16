export default function DocumentsPage() {
  return (
    <div className="space-y-8">

      {/* Document List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((document) => (
          <div key={document} className="bg-pink-50 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Tài liệu {document}</h3>
                  <p className="mt-1 text-sm text-gray-500">Tài liệu về ...</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-pink-700 bg-pink-100 rounded-full">
                  PDF
                </span>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 text-sm font-medium text-pink-600 hover:text-pink-700">
                  Xem tài liệu →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
