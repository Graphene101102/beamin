import type { Metadata } from "next";
import StudentHeader from '../components/student/layout/Header';

export const metadata: Metadata = {
  title: "BeaMin",
  description: "Nền tảng học tập trực tuyến",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentHeader />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
