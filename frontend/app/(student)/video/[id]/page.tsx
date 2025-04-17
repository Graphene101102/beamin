'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { use } from 'react';

// Mock data - in real app this would come from API
const videoData = {
  "1": {
    title: "Bài 1 : CÂU CHUYỆN CỦA LỊCH SỬ",
    description: "Tìm hiểu về lịch sử và các câu chuyện thú vị",
    youtubeId: "BAVulg_e888" // Replace with actual YouTube video ID
  },
  "2": {
    title: "Bài 2 : VẺ ĐẸP CỔ ĐIỂN",
    description: "Khám phá vẻ đẹp của nghệ thuật cổ điển",
    youtubeId: "DvuZVZoKfew" // Replace with actual YouTube video ID
  },
  // Add more videos as needed
};

export default function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const video = videoData[id as keyof typeof videoData];

  if (!video) {
    return (
      <div className="min-h-screen bg-pink-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-semibold text-gray-900">Video không tồn tại</h1>
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

          <h1 className="text-2xl font-semibold text-gray-900 mb-4">{video.title}</h1>
          <p className="text-gray-600 mb-6">{video.description}</p>

          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
} 