import React, { useState, useEffect } from 'react';
import { Contact, Plus, Pencil } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersrbr } from '../../../features/user/userSlice';
import MofawadhiyaModal from './MofawadhiyaModal';
import UpdateModalMofawadhiya from './UpdateModalMofawadhiya';

const Amofawadhiya = () => {

  const [userstxt,setUserstxt] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Pour stocker l'utilisateur sélectionné pour l'update

  const dispatch = useDispatch();

  const { users = [], loading, error } = useSelector((state) => state.user);
   
  useEffect(() => {

    //window.location.reload();

    dispatch(fetchUsersrbr()).then((res) => {
      //console.log('✅ Données utilisateurs récupérées :', res.payload);
      
    });
   
  }, [dispatch]);


  const handleOpenUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-gray-300 flex flex-col justify-center items-center dir-rtl">
      {/* Titre */}
      <div className="absolute top-4 right-4 flex items-center text-indigo-900 text-3xl md:text-4xl gap-2">
        <h1>قائمة المفوّضيات</h1>
        <Contact className="w-14 h-14" />
      </div>

      {/* Bouton Ajouter */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute left-4 top-4 flex items-center border-2 border-white bg-black hover:bg-green-600 rounded-full text-white text-2xl p-2"
      >
        إضافة <Plus className="mr-1" />
      </button>

      {/* Modal Ajouter */}
      <MofawadhiyaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Modal Modifier */}
      <UpdateModalMofawadhiya
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        userData={selectedUser} // On passe les données sélectionnées
      />

      {/* Cartes */}
      <div className="flex flex-wrap justify-center w-full px-4 mt-24 gap-6">
        {loading ? (
          <div className="text-center py-4 text-xl">جارٍ التحميل...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500 text-xl">{error}</div>
        ) : users.length > 0 ? (
          users.map((item, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg rounded-lg p-6 w-80 hover:scale-105 transform transition-all duration-300 border border-gray-300"
            >
              {/* Bouton Modifier */}
              <button
                onClick={() => handleOpenUpdateModal(item)}
                className="absolute top-2 left-2 bg-yellow-400 hover:bg-yellow-300 text-indigo-900 rounded-full p-2 shadow transition"
                title="تعديل"
              >
                <Pencil size={20} />
              </button>

              {/* Titre : Région */}
              <h2 className="text-2xl font-bold text-indigo-700 mb-2 text-center">{item.region}</h2>

              {/* Informations utilisateur */}
              <div className="text-right text-gray-700 space-y-2">
                <p><span className="font-semibold">اللقب :</span> {item.nom}</p>
                <p><span className="font-semibold">الاسم :</span> {item.prenom}</p>
                <p><span className="font-semibold">معرّف :</span> {item.idscout}</p>
                <p><span className="font-semibold">الهاتف :</span> {item.numtel}</p>
                <p><span className="font-semibold">البريد الإلكتروني :</span> {item.adresseemail}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 text-xl">
            لا توجد مفوّضيات
          </div>
        )}
      </div>
    </div>
  );
};

export default Amofawadhiya;
