import React, { useState, useEffect } from 'react';
import { Contact, Plus, Pencil } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderModal from './LeaderModal';
import UpdateLeaderModal from './UpdateLeaderModal';
import { fetchUsersleader } from '../../../features/user/userSlice';

const Leaders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  const { users = [], loading, error } = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.auth.user); // 🆕 utilisateur connecté

  useEffect(() => {
    dispatch(fetchUsersleader()).then((res) => {
      console.log('✅ Données utilisateurs récupérées :', res.payload);
    });
  }, [dispatch]);

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  // 🆕 Filtrer les leaders créés par l'utilisateur connecté
  const filteredUsers = users.filter((u) => u.createdBy === currentUser?._id);

  return (
    <div className="relative min-h-screen bg-gray-300 flex flex-col justify-center items-center dir-rtl">
      {/* Titre */}
      <div className="absolute top-4 right-4 flex items-center text-indigo-900 text-3xl md:text-4xl gap-2">
        <h1>قائمة القادة</h1>
        <Contact className="w-14 h-14" />
      </div>

      {/* Bouton Ajouter */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute left-4 top-4 flex items-center border-2 border-white bg-black hover:bg-green-600 rounded-full text-white text-2xl p-2"
      >
        إضافة <Plus className="mr-1" />
      </button>

      {/* Modals */}
      <LeaderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <UpdateLeaderModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        userData={selectedUser}
      />

      {/* Cartes */}
      <div className="flex flex-wrap justify-center w-full px-4 mt-24 gap-6">
        {loading ? (
          <div className="text-center py-4 text-xl">جارٍ التحميل...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500 text-xl">{error}</div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 w-80 hover:scale-105 transform transition-all duration-300 border border-gray-300 relative"
            >
              <h2 className="text-2xl font-bold text-indigo-700 mb-2 text-center">{item.nom} {item.prenom}</h2>
              <div className="text-right text-gray-700 space-y-2">
                <p><span className="font-semibold">المجموعة :</span> {item.groupe || 'غير محددة'}</p>
                <p><span className="font-semibold">معرّف كشفي :</span> {item.idscout}</p>
                <p><span className="font-semibold">الهاتف :</span> {item.numtel}</p>
                <p><span className="font-semibold">البريد الإلكتروني :</span> {item.adresseemail}</p>
                <p><span className="font-semibold">المنطقة :</span> {item.region}</p>
              </div>

              {/* Bouton Modifier */}
              <button
                onClick={() => openUpdateModal(item)}
                className="absolute top-2 left-2 bg-yellow-400 hover:bg-yellow-300 text-indigo-900 rounded-full p-2 border border-yellow-700 transition"
              >
                <Pencil size={20} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 text-xl">
            لا توجد قادة تمت إضافتهم
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaders;
