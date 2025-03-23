import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { createUser } from '../../../features/user/userSlice';

const LeaderModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // Récupérer l'utilisateur depuis le store de manière sécurisée
  const { user } = useSelector((state) => state.auth);
  const userRegion = user?.region?.value || ''; // Vérification sécurisée et valeur par défaut

  const [formData, setFormData] = useState({
    idscout: '',
    nom: '',
    prenom: '',
    numtel: '',
    adresseemail: '',
    groupe: '',
    region: userRegion,  // Initialiser avec la valeur de la région ou une valeur par défaut
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!formData.idscout || !formData.nom || !formData.prenom || !formData.numtel || !formData.adresseemail || !formData.groupe || !formData.region) {
      setErrorMessage('Tous les champs sont requis.');
      setLoading(false);
      return;
    }

    const userData = {
      ...formData,
      role: 'leader',
      mot_de_passe: formData.idscout,
    };

    try {
      await dispatch(createUser(userData)).unwrap();
      setFormData({
        idscout: '',
        nom: '',
        prenom: '',
        numtel: '',
        adresseemail: '',
        groupe: '', // Réinitialiser le champ 'groupe'
        region: '', // Réinitialiser la région
      });
      onClose();
    } catch (error) {
      setErrorMessage(error.message || error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
         onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative bg-blue-500 p-8 rounded-lg w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto">
        <div className="relative flex justify-center items-center mb-5">
          <h3 className="text-3xl text-indigo-900">إضافة مفوّضية</h3>
          <button onClick={onClose} className="absolute right-3 top-0 w-12 h-12 flex items-center justify-center rounded-full text-black text-2xl border border-white hover:bg-red-500 hover:text-white">
            <X />
          </button>
        </div>

        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          {['idscout', 'nom', 'prenom', 'numtel', 'adresseemail'].map((field, index) => (
            <div key={index} className="mb-5">
              <h6 className="text-black text-2xl mb-2">{field}</h6>
              <input type="text" name={field} value={formData[field]} onChange={handleChange} 
                     className="bg-white rounded-full text-2xl w-full p-2" required />
            </div>
          ))}

          <div className="mb-5">
            <h6 className="text-black text-2xl mb-2">اختار الخيار المفضل</h6>
            <input type="text" name="region" value={formData.region} 
                   onChange={handleChange} className="bg-white rounded-full text-2xl w-full p-2" required />
          </div>

          <div className="mb-5">
            <h6 className="text-black text-2xl mb-2">Groupe</h6>
            <input type="text" name="groupe" value={formData.groupe} onChange={handleChange} 
                   className="bg-white rounded-full text-2xl w-full p-2" required />
          </div>

          <button type="submit" className="w-full p-3 bg-green-600 hover:bg-black text-white text-2xl rounded-full" 
                  disabled={loading}>
            {loading ? 'جاري التحميل...' : 'تسجيل'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaderModal;
