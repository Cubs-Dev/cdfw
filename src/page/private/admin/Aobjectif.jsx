import React, { useState, useEffect } from 'react';
import { Contact, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import ObjectifModal from './ObjectifModal';
import { getObjectifs } from '../../../features/objectif/objectifSlice';
import { motion } from 'framer-motion';

const Aobjectif = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { objectifs, loading, error } = useSelector((state) => state.objectif);

  useEffect(() => {
    dispatch(getObjectifs());
  }, [dispatch]);

  // Trier les objectifs par numeroObjectif de manière décroissante
  const sortedObjectifs = [...objectifs].sort((a, b) => {
    return parseInt(b.numeroObjectif) - parseInt(a.numeroObjectif); // Tri décroissant
  });

  // Grouper les objectifs par étape
  const groupedByEtape = sortedObjectifs.reduce((acc, obj) => {
    const etape = obj.etape;
    if (!acc[etape]) acc[etape] = [];
    acc[etape].push(obj);
    return acc;
  }, {});

  // Couleurs par étape
  const etapeColors = {
    1: 'bg-blue-100 border-blue-500',
    2: 'bg-green-100 border-green-500',
    3: 'bg-yellow-100 border-yellow-500',
    4: 'bg-red-100 border-red-500',
  };

  // Noms arabes des étapes (comme dans le formulaire)
  const etapeLabels = {
    1: 'مرحلة الاندماج',
    2: 'الشبل الفارس',
    3: 'الشبل الامير',
    4: 'الشبل الملك',
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const renderCards = (etape) => {
    const data = groupedByEtape[etape] || [];

    return (
      <div key={etape} className="mb-10 w-full bg-gray-300">
        <h2 className="text-3xl text-indigo-800 font-semibold mb-4 text-right">
          {etapeLabels[etape]}
        </h2>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={`border-l-4 p-4 rounded-xl shadow-md ${etapeColors[etape]} hover:scale-105 transition-transform duration-300`}
              >
                <h3 className="text-xl font-bold text-indigo-900 mb-2 text-right">
                  رقم الهدف: {item.numeroObjectif}
                </h3>
                <p className="text-lg text-gray-800 text-right">📌 {item.libelle}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-right">لا توجد أهداف في هذه المرحلة</div>
        )}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gray-300 flex flex-col items-center dir-rtl p-6">
      {/* Titre */}
      <div className="absolute top-4 right-4 flex items-center text-indigo-900 text-3xl md:text-4xl gap-2">
        <h1>قائمة الأهداف</h1>
        <Contact className="w-14 h-14" />
      </div>

      {/* Bouton Ajouter */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute left-4 top-4 flex items-center border-2 border-white bg-black hover:bg-green-600 rounded-full text-white text-2xl p-2"
      >
        إضافة <Plus className="mr-1" />
      </button>

      {/* Modal */}
      <ObjectifModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Contenu */}
      <div className="w-full mt-28 max-w-7xl px-4">
        {loading ? (
          <div className="text-center py-8 text-xl">جارٍ التحميل...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500 text-xl">{error}</div>
        ) : (
          [1, 2, 3, 4].map((etape) => renderCards(String(etape)))
        )}
      </div>
    </div>
  );
};

export default Aobjectif;
