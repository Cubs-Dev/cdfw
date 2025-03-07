import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Smile } from 'lucide-react';

const AwelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-blue-300 flex flex-col justify-center items-center text-center">
      <div className="absolute top-8 right-8 flex items-center text-indigo-900 text-3xl md:text-4xl gap-1">
        <h1>مرحبًا بك في منصتنا</h1>
        <Smile className="w-14 h-14" />
      </div>

      <div className="bg-white p-2 rounded-full shadow-lg w-auto border-yellow-500  border-4 ">
        <h2 className="text-indigo-900 text-4xl font-bold mb-4">أهلاً وسهلاً!</h2>
        <p className="text-gray-700 text-xl mb-6 ml-4 mr-6">
          نحن سعداء بانضمامك إلينا. استكشف منصتنا واستمتع بالخدمات التي نقدمها.
        </p>
      </div>
    </div>
  );
};

export default AwelcomePage;
