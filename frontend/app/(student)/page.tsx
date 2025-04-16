import Image from 'next/image';

export default function StudentHomePage() {
  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">


          {/* Course Content */}
          <div className="bg-pink-50 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Nội dung khóa học</h2>
            <div className="space-y-3">
              {[
                "Bài 1 : CÂU CHUYỆN CỦA LỊCH SỬ",
                "Bài 2 : VẺ ĐẸP CỔ ĐIỂN",
                "Bài 3 : LỜI SÔNG NÚI",
                "Bài 4 : TIẾNG CƯỜI TRÀO PHÚNG TRONG THƠ",
                "Bài 5 : NHỮNG CÂU CHUYỆN HÀI",
              ].map((chapter, index) => (
                <div 
                  key={index}
                  className="p-4 bg-white border rounded-lg hover:border-pink-500 cursor-pointer flex items-center"
                >
                  <span className="mr-2 text-pink-600">+</span>
                  <h3 className="font-medium text-gray-900">{chapter}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructor Info */}
        <div className="bg-pink-50 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Giảng viên</h2>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <Image
                src="/image/minh.jpg"
                alt="Cô Thắm"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">CÔ Minh</h3>
            <div className="flex items-center gap-4 text-gray-600 mb-2">
              <span>Xinh gái nhất trái đất</span>
            </div>
            <button className="mt-4 w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700">
              Chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
