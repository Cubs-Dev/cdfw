import { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updateUser, fetchUsersrbr } from '../../../features/user/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateModalMofawadhiya = ({ isOpen, onClose, userData }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: '', // On stocke l'id sans l'afficher
    idscout: '',
    nom: '',
    prenom: '',
    numtel: '',
    adresseemail: '',
    region: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Préremplissage des données
  useEffect(() => {
    if (userData) {
      setFormData({
        id: userData._id || '', // Récupération de l'id
        idscout: userData.idscout || '',
        nom: userData.nom || '',
        prenom: userData.prenom || '',
        numtel: userData.numtel || '',
        adresseemail: userData.adresseemail || '',
        region: userData.region || '',
      });
    }
  }, [userData]);

  // Gérer overflow body quand modal ouverte
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'numtel') {
      const numericValue = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const requiredFields = ['idscout', 'nom', 'prenom', 'numtel', 'adresseemail', 'region'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setErrorMessage('جميع الحقول مطلوبة.');
        setLoading(false);
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.adresseemail)) {
      setErrorMessage('صيغة البريد الإلكتروني غير صحيحة.');
      setLoading(false);
      return;
    }

    const numtelRegex = /^[0-9]{8}$/;
    if (!numtelRegex.test(formData.numtel)) {
      setErrorMessage('رقم الهاتف يجب أن يحتوي على 8 أرقام.');
      setLoading(false);
      return;
    }

    const updatedUserData = {
      idscout: formData.idscout,
      nom: formData.nom,
      prenom: formData.prenom,
      numtel: formData.numtel,
      adresseemail: formData.adresseemail,
      region: formData.region,
      role: 'rbr', // On garde le rôle
    };

    try {
      // On utilise bien l'id stocké dans formData
      await dispatch(updateUser({ id: formData.id, ...updatedUserData })).unwrap();
      onClose();
      dispatch(fetchUsersrbr());
      toast.success('✅ تم تعديل بيانات المفوّضية بنجاح');
    } catch (error) {
      setErrorMessage(error.message || error.response?.data?.message || 'حدث خطأ أثناء تعديل المستخدم.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-indigo-900 text-white p-6 md:p-8 rounded-2xl shadow-2xl w-11/12 md:w-1/2 max-h-[85vh] overflow-y-auto text-right">
        <div className="relative flex justify-center items-center mb-6">
          <h3 className="text-3xl font-bold text-yellow-400">تعديل المفوّضية</h3>
          <button onClick={onClose} className="absolute left-3 top-0 w-10 h-10 flex items-center justify-center rounded-full border border-yellow-500 hover:bg-red-500 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {errorMessage && (
          <div className="flex items-center text-red-700 bg-red-100 border border-red-300 rounded-lg p-3 mb-4 text-sm">
            <AlertCircle className="ml-2 text-red-500" size={20} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: 'المعرّف الكشفي', name: 'idscout', type: 'text' },
            { label: 'اللقب', name: 'nom', type: 'text' },
            { label: 'الاسم', name: 'prenom', type: 'text' },
            { label: 'رقم الهاتف', name: 'numtel', type: 'text', hint: 'أدخل 8 أرقام' },
            { label: 'البريد الإلكتروني', name: 'adresseemail', type: 'email' },
          ].map(({ label, name, type, hint }) => (
            <div key={name}>
              <label className="block text-lg text-yellow-200 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                maxLength={name === 'numtel' ? 8 : undefined}
                className="bg-yellow-50 text-indigo-900 rounded-full text-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-right border-r-8 border-b-2 border-yellow-500"
                required
              />
              {hint && <p className="text-xs text-yellow-100 mt-1">{hint}</p>}
            </div>
          ))}

          <div>
            <label className="block text-lg text-yellow-200 mb-1">اختر الولاية</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="bg-yellow-50 text-indigo-900 rounded-full text-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-right border-r-8 border-b-2 border-yellow-500"
              required
            >
              <option value="" disabled>اختر ولاية</option>
              {[
                'تونس', 'أريانة', 'بن عروس', 'منوبة',
                'نابل', 'زغوان', 'بنزرت', 'باجة',
                'جندوبة', 'الكاف', 'سليانة', 'القيروان',
                'سوسة', 'المنستير', 'المهدية', 'صفاقس',
                'سيدي بوزيد', 'القصرين', 'قفصة', 'توزر',
                'قبلي', 'قابس', 'مدنين', 'تطاوين'
              ].map((region, index) => (
                <option key={index} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-yellow-500 hover:bg-yellow-400 text-indigo-900 text-xl rounded-full transition border-r-8 border-b-2 border-yellow-800 flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-indigo-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                جاري التحميل...
              </>
            ) : 'حفظ التعديلات'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModalMofawadhiya;
