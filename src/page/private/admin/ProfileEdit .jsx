import React, { useState, useEffect } from 'react';
import { Contact, Save } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../features/user/userSlice';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    _id: '',
    nom: '',
    prenom: '',
    idscout: '',
    numtel: '',
    adresseemail: '',
    region: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        _id: user._id || '',
        nom: user.nom || '',
        prenom: user.prenom || '',
        idscout: user.idscout || '',
        numtel: user.numtel || '',
        adresseemail: user.adresseemail || '',
        region: user.region || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData._id) {
      // Ici on pourrait afficher une alerte classique si besoin
      alert('L\'ID de l\'utilisateur est manquant');
      return;
    }

    dispatch(updateUser(formData))
      .then(() => {
        // Notification supprimée
        console.log('Mise à jour réussie');
      })
      .catch(() => {
        // Notification supprimée
        console.error('Erreur lors de la mise à jour');
      });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 flex flex-col justify-center items-center p-4 dir-rtl">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 text-indigo-900 text-4xl font-bold">
          <h1>تحديث المعلومات الشخصية</h1>
          <Contact className="w-12 h-12" />
        </div>
        <p className="text-gray-600 mt-2 text-lg">قم بتحديث بياناتك أدناه</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md flex flex-col gap-6 border border-gray-300 transition-all duration-300 hover:scale-105"
      >
        <Input label="الاسم" name="nom" value={formData.nom} onChange={handleChange} />
        <Input label="اللقب" name="prenom" value={formData.prenom} onChange={handleChange} />
        <Input label="معرّف الكشافة" name="idscout" value={formData.idscout} onChange={handleChange} />
        <Input label="رقم الهاتف" name="numtel" value={formData.numtel} onChange={handleChange} />
        <Input label="البريد الإلكتروني" name="adresseemail" value={formData.adresseemail} onChange={handleChange} />
        <Input label="المنطقة" name="region" value={formData.region} onChange={handleChange} />

        <button
          type="submit"
          className="flex justify-center items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white p-3 rounded-full text-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          حفظ <Save />
        </button>
      </form>
    </div>
  );
};

const Input = ({ label, name, value, onChange }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-gray-700 font-bold text-lg">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
    />
  </div>
);

export default ProfileEdit;
