import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Plus, Contact, Undo2 } from 'lucide-react';

const Mofawadhiya = ({ setVisibleCreatePanel, handleGetUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Gérer l'état de la modale
  const navigate = useNavigate(); // Utiliser le hook pour naviguer entre les pages

  // Désactive le défilement de l'arrière-plan lorsque la modale est ouverte
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Empêcher le défilement
    } else {
      document.body.style.overflow = 'auto'; // Autoriser le défilement
    }

    // Cleanup lorsque le composant est démonté ou la modale est fermée
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true); // Ouvre la modale
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Ferme la modale
  };

  const handleBackgroundClick = (e) => {
    // Si l'on clique sur l'arrière-plan (espace noir), on ferme la modale
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Retour à la page précédente
  };

  return (
    <div className="relative justify-center items-center bg-gray-200 h-auto w-auto ">
      <div className=" flex absolute justify-center right-4 items-center text-indigo-900 text-3xl md:text-4xl gap-2">
        <h1> فضاء المفوّضيات </h1>
        <Contact className="w-14 h-14 text-indigo-900" />
      </div>
      <br />
      <br />
      <div className="flex justify-center items-center h-2/3 w-auto ">
        <div className="flex justify-center items-center w-auto mt-10 md:w-3/4 md:mt-4 md:mr-5 md:ml-5">
          {/* Bouton pour ouvrir la modale */}
          <button
            onClick={handleOpenModal}
            className=" flex md:absolute flex left-4 top-0 items-center w-auto h-auto border-2 border-white bg-black hover:bg-green-600 rounded-full text-white text-2xl p-2 mt-4"
          >
            إضافة
            <Plus className="mr-1" />
          </button>
        </div>

        {/* Modale pour le formulaire */}
        {isModalOpen && (
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleBackgroundClick} // Ferme la modale si on clique sur le fond noir
          >
            <div className="bg-white p-8 rounded-lg w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto cursor-move">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-3xl text-indigo-900">نموذج التسجيل</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-red-500 text-xl font-bold"
                >
                  X
                </button>
              </div>

              {/* Formulaire d'inscription */}
              <form>
                <h6 className="text-black text-2xl mb-5">رقم كشف الطلّاب*</h6>
                <input
                  type="number"
                  name="idscouts"
                  placeholder="رقم كشف الطلّاب"
                  className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                  required
                />

                <div className="md:flex justify-between items-center">
                  <div className="md:p-2">
                    <h6 className="text-black text-2xl mb-5">الاسم</h6>
                    <input
                      type="text"
                      name="nom"
                      placeholder="الاسم"
                      className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                      required
                    />
                  </div>
                  <div className="md:p-2">
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

                <div className="md:flex justify-between items-center">
                  <div className="md:p-2">
                    <h6 className="text-black text-2xl mb-5">كلمة المرور</h6>
                    <input
                      type="password"
                      name="password"
                      placeholder="كلمة المرور"
                      className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                      required
                    />
                  </div>
                  <div className="md:p-2">
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
                    className="flex items-center w-auto h-auto border-2 border-black bg-green-600 hover:bg-black rounded-full text-white text-2xl p-2 mt-4"
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
    </div>
  );
};

export default Mofawadhiya;
