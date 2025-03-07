import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Contact, X } from 'lucide-react'; // Importez l'icône X de Lucide

const Amofawadhiya = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-300 flex flex-col justify-center items-center">
      <div className="absolute top-4 right-4 flex items-center text-indigo-900 text-3xl md:text-4xl gap-2">
        <h1>فضاء المفوّضيات</h1>
        <Contact className="w-14 h-14" />
      </div>

      <button
        onClick={handleOpenModal}
        className="absolute left-4 top-4 flex items-center border-2 border-white bg-black hover:bg-green-600 rounded-full text-white text-2xl p-2"
      >
        إضافة
        <Plus className="mr-1" />
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleBackgroundClick}
        >
          <div className="relative bg-blue-500 p-8 rounded-lg w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto">
            <div className="relative flex justify-center items-center mb-5">
              <h3 className="text-3xl text-indigo-900"> إضافة مفوّضية</h3>
              <button
                onClick={handleCloseModal}
                className="absolute right-3 top-0 w-12 h-12 flex items-center justify-center rounded-full text-black text-2xl border border-white  hover:bg-red-500 hover:text-white "
              >
                <X />
              </button>
            </div>

            <form>
              <h6 className="text-black text-2xl mb-5">رقم كشف الطلّاب*</h6>
              <input
                type="number"
                name="idscouts"
                placeholder="رقم كشف الطلّاب"
                className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                required
              />

              {/* Mise à jour pour aligner les champs de manière responsive */}
              <div className="md:flex md:justify-between items-center space-y-5 md:space-y-0">
                <div className="md:w-1/2 md:pr-2">
                  <h6 className="text-black text-2xl mb-5">الاسم</h6>
                  <input
                    type="text"
                    name="nom"
                    placeholder="الاسم"
                    className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                    required
                  />
                </div>
                <div className="md:w-1/2 md:pl-2">
                  <h6 className="text-black text-2xl mb-5">اللقب</h6>
                  <input
                    type="text"
                    name="prenom"
                    placeholder="اللقب"
                    className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                    required
                  />
                </div>
              </div>

              <h6 className="text-black text-2xl mb-5">اسم الأب</h6>
              <input
                type="text"
                name="prenompere"
                placeholder="اسم الأب"
                className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                required
              />

              <h6 className="text-black text-2xl mb-5">رقم الهاتف</h6>
              <input
                type="number"
                name="numtel"
                placeholder="رقم الهاتف"
                className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                required
              />

              <h6 className="text-black text-2xl mb-5">البريد الإلكتروني</h6>
              <input
                type="email"
                name="adresseemail"
                placeholder="البريد الإلكتروني"
                className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                required
              />

              <div className="md:flex md:justify-between items-center space-y-5 md:space-y-0">
                <div className="md:w-1/2 md:pr-2">
                  <h6 className="text-black text-2xl mb-5">كلمة المرور</h6>
                  <input
                    type="password"
                    name="password"
                    placeholder="كلمة المرور"
                    className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                    required
                  />
                </div>
                <div className="md:w-1/2 md:pl-2">
                  <h6 className="text-black text-2xl mb-5">تأكيد كلمة المرور</h6>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="تأكيد كلمة المرور"
                    className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="flex items-center border-2 border-black bg-green-600 hover:bg-black rounded-full text-white text-2xl p-2 mt-4"
                >
                  <Plus className="mr-1" />
                  تسجيل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Amofawadhiya;
