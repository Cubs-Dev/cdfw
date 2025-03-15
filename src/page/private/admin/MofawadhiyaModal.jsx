import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../features/user/userSlice';

const MofawadhiyaModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    idscout: '',
    nom: '',
    prenom: '',
    numtel: '',
    adresseemail: '',
    region: ''
  });

  // État pour gérer l'affichage du bouton de chargement
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Ajouter un état pour afficher les erreurs

  // Effet pour désactiver le défilement lorsque la modale est ouverte
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Active l'état de chargement
    setErrorMessage(''); // Réinitialiser l'erreur

    // Validation simple des champs
    if (!formData.idscout || !formData.nom || !formData.prenom || !formData.numtel || !formData.adresseemail || !formData.region) {
      setErrorMessage('Tous les champs sont requis.');
      setLoading(false);
      return;
    }

    const userData = {
      idscout: formData.idscout,
      nom: formData.nom,
      prenom: formData.prenom,
      numtel: formData.numtel,
      adresseemail: formData.adresseemail,
      region: formData.region,
      role: 'rbr', // Ajouter le rôle
      mot_de_passe: formData.idscout, // Utiliser idscout comme mot de passe
    };
    console.log(userData);

    try {
      // Envoie userData à l'API via Redux
      await dispatch(createUser(userData)).unwrap();

      // Réinitialise le formulaire après la création de l'utilisateur
      setFormData({
        idscout: '',
        nom: '',
        prenom: '',
        numtel: '',
        adresseemail: '',
        region: ''
      });

      // Ferme la modale après la soumission réussie
      onClose();
    } catch (error) {
      // Afficher l'erreur reçue dans le composant
      setErrorMessage(error.message || error.response?.data?.message || 'Une erreur est survenue lors de la création de l’utilisateur');
    } finally {
      setLoading(false); // Désactive l'état de chargement après la soumission
    }
  };

  // Si la modale n'est pas ouverte, ne rien afficher
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
         onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative bg-blue-500 p-8 rounded-lg w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto">
        {/* Titre de la modale */}
        <div className="relative flex justify-center items-center mb-5">
          <h3 className="text-3xl text-indigo-900">إضافة مفوّضية</h3>
          {/* Bouton pour fermer la modale */}
          <button onClick={onClose} className="absolute right-3 top-0 w-12 h-12 flex items-center justify-center rounded-full text-black text-2xl border border-white hover:bg-red-500 hover:text-white">
            <X />
          </button>
        </div>

        {/* Affichage des erreurs */}
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

        {/* Formulaire d'ajout */}
        <form onSubmit={handleSubmit}>
          {['idscout', 'nom', 'prenom', 'numtel', 'adresseemail'].map((field, index) => (
            <div key={index} className="mb-5">
              <h6 className="text-black text-2xl mb-2">{field}</h6>
              {/* Champ de saisie */}
              <input type="text" name={field} value={formData[field]} onChange={handleChange} 
                     className="bg-white rounded-full text-2xl w-full p-2" required />
            </div>
          ))}

          {/* Sélection de la région */}
          <div className="mb-5">
            <h6 className="text-black text-2xl mb-2">اختار الخيار المفضل</h6>
            <select name="region" value={formData.region} onChange={handleChange} 
                    className="bg-white rounded-full text-2xl w-full p-2" required>
              <option value="" disabled>اختر خيارًا</option>
              {['Tunis', 'Ariana', 'Ben Arous', 'Manouba'].map((region, index) => (
                <option key={index} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* Bouton de soumission */}
          <button type="submit" className="w-full p-3 bg-green-600 hover:bg-black text-white text-2xl rounded-full" 
                  disabled={loading}>
            {loading ? 'جاري التحميل...' : 'تسجيل'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MofawadhiyaModal;
