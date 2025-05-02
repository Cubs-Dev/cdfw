import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createObjectif } from '../../../features/objectif/objectifSlice';

const ObjectifModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    numeroObjectif: '',
    libelle: '',
    etape: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const { numeroObjectif, libelle, etape } = formData;

    if (!numeroObjectif || !libelle || !etape) {
      setErrorMessage('جميع الخانات مطلوبة.');
      setLoading(false);
      return;
    }

    const parsedNumero = parseInt(numeroObjectif, 10);
    const parsedEtape = parseInt(etape, 10);

    if (isNaN(parsedNumero)) {
      setErrorMessage('رقم الهدف يجب أن يكون رقماً صحيحاً.');
      setLoading(false);
      return;
    }

    if (isNaN(parsedEtape)) {
      setErrorMessage('المرحلة يجب أن تكون رقماً صحيحاً.');
      setLoading(false);
      return;
    }

    try {
      await dispatch(
        createObjectif({
          numeroObjectif: parsedNumero,
          libelle,
          etape: parsedEtape
        })
      ).unwrap();

      setFormData({ numeroObjectif: '', libelle: '', etape: '' });
      onClose();
    } catch (error) {
      console.log('Erreur complète:', error);
      setErrorMessage(
        error?.message || error || 'حدث خطأ أثناء حفظ الهدف.'
      );
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
      <div className="relative bg-white p-8 rounded-lg w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto">
        <div className="relative flex justify-center items-center mb-5">
          <h3 className="text-3xl text-indigo-900">إضافة هدف</h3>
          <button
            onClick={onClose}
            className="absolute right-3 top-0 w-12 h-12 flex items-center justify-center rounded-full text-black text-2xl border border-gray-300 hover:bg-red-500 hover:text-white"
          >
            <X />
          </button>
        </div>

        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <h6 className="text-black text-2xl mb-2">رقم الهدف</h6>
            <input
              type="number"
              name="numeroObjectif"
              value={formData.numeroObjectif}
              onChange={handleChange}
              className="bg-gray-100 rounded-full text-2xl w-full p-2"
              required
            />
          </div>

          <div className="mb-5">
            <h6 className="text-black text-2xl mb-2">الهدف</h6>
            <input
              type="text"
              name="libelle"
              value={formData.libelle}
              onChange={handleChange}
              className="bg-gray-100 rounded-full text-2xl w-full p-2"
              required
            />
          </div>

          <div className="mb-5">
            <h6 className="text-black text-2xl mb-2">المرحلة</h6>
            <select
              name="etape"
              value={formData.etape}
              onChange={handleChange}
              className="bg-gray-100 rounded-full text-2xl w-full p-2"
              required
            >
              <option value="" disabled>اختر مرحلة</option>
              <option value="1">مرحلة الاندماج</option>
              <option value="2">الشبل الفارس</option>
              <option value="3">الشبل الامير</option>
              <option value="4">الشبل الملك</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-600 hover:bg-black text-white text-2xl rounded-full"
            disabled={loading}
          >
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ObjectifModal;
