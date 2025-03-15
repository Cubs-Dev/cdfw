import React, { useState, useEffect } from 'react';
import { Contact, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'; // Import de useDispatch et useSelector pour interagir avec Redux
import MofawadhiyaModal from './MofawadhiyaModal';
import { fetchUsers } from '../../../features/user/userSlice'; // Import de la fonction fetchUsers

const Amofawadhiya = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.user); // Accéder à l'état des utilisateurs dans Redux

  // Utilisation de useEffect pour récupérer les utilisateurs au montage du composant
  useEffect(() => {
    dispatch(fetchUsers()); // Dispatch de l'action pour récupérer les utilisateurs
  }, [dispatch]);

  return (
    <div className="relative min-h-screen bg-gray-300 flex flex-col justify-center items-center dir-rtl">
      <div className="absolute top-4 right-4 flex items-center text-indigo-900 text-3xl md:text-4xl gap-2">
        <h1>قائمة المفوّضيات</h1>
        <Contact className="w-14 h-14" />
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute left-4 top-4 flex items-center border-2 border-white bg-black hover:bg-green-600 rounded-full text-white text-2xl p-2"
      >
        إضافة <Plus className="mr-1" />
      </button>

      <MofawadhiyaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex w-full px-4 overflow-x-auto">
        {loading ? (
          <div className="text-center py-4">Chargement...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                {['معرّف', 'إسم المفوّض', 'لقب المفوّض', 'الهاتف', 'البريد الإلكتروني', 'المنطقة'].map((header, index) => (
                  <th key={index} className="px-4 py-2 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((item, index) => (
                  <tr key={index} className="border-t">
                    {['idsrr', 'nomrr', 'prenomrr', 'numtelrr', 'adresseemailrr', 'regionr'].map((field, idx) => (
                      <td key={idx} className="px-4 py-2">{item[field]}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">Aucun utilisateur trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Amofawadhiya;
