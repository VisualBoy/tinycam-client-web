import MainLayout from '@/components/MainLayout';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-white">
      <header className="w-full mb-8">
        <h1 className="text-4xl font-bold text-center">tinyCam Monitor Web Client</h1>
      </header>

      <MainLayout />
    </div>
  );
}
