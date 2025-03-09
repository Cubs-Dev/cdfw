import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus, Contact, X } from 'lucide-react'; 
import { setIsModalOpen, setFormData, resetForm, setLoading, setError } from '../../../features/admin/amofawadhiyaSlice';
import axios from 'axios';

const Amofawadhiya = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isModalOpen, formData, loading, error } = useSelector((state) => state.amofawadhiya);
  const [mofawadhiyaList, setMofawadhiyaList] = useState([]);  // State to store the list of Mofawadhiya

  // Fetch Mofawadhiya data on component mount
  useEffect(() => {
    const fetchMofawadhiya = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/mofawadhiya');
        setMofawadhiyaList(response.data.data || []);  // Default to empty array if no data
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
      }
    };

    fetchMofawadhiya();
  }, []);

  // Close modal on background click
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const handleOpenModal = () => dispatch(setIsModalOpen(true));
  const handleCloseModal = () => dispatch(setIsModalOpen(false));

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData); // Vérification des données avant envoi

    try {
      dispatch(setLoading(true));
      const response = await axios.post('http://localhost:5000/api/mofawadhiya/gmofawadhiya', formData);
      dispatch(resetForm());
      dispatch(setIsModalOpen(false));
      navigate('/some-page'); // Redirection après succès

      // Only update if the response has valid data
      if (response.data.data) {
        setMofawadhiyaList((prevList) => [...prevList, response.data.data]);
      }
    } catch (err) {
      dispatch(setError(err.message));
      console.error('Erreur de soumission:', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-300 flex flex-col justify-center items-center dir-rtl">
      <div className="absolute top-4 right-4 flex items-center text-indigo-900 text-3xl md:text-4xl gap-2">
        <h1>فضاء المفوّضيات</h1>
        <Contact className="w-14 h-14" />
      </div>

      <button
        onClick={handleOpenModal}
        className="absolute left-4 top-4 flex items-center border-2 border-white bg-black hover:bg-green-600 rounded-full text-white text-2xl p-2"
      >
        إضافة
        <Plus className="mr-1" />
      </button>

      {/* Modal Form */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleBackgroundClick}
        >
          <div className="relative bg-blue-500 p-8 rounded-lg w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto">
            <div className="relative flex justify-center items-center mb-5">
              <h3 className="text-3xl text-indigo-900"> إضافة مفوّضية</h3>
              <button
                onClick={handleCloseModal}
                className="absolute right-3 top-0 w-12 h-12 flex items-center justify-center rounded-full text-black text-2xl border border-white  hover:bg-red-500 hover:text-white "
              >
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Form Fields */}
              <h6 className="text-black text-2xl mb-5">  المعرّف الكشفي للمفوّض*</h6>
              <input
                type="number"
                name="idsrr"
                value={formData.idsrr || ''}
                onChange={handleInputChange}
                placeholder=" المعرّف الكشفي للمفوّض"
                className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                required
              />

              <div className="md:flex md:justify-between items-center space-y-5 md:space-y-0">
                <div className="md:w-1/2 md:pr-2">
                  <h6 className="text-black text-2xl mb-5">إسم المفوّض</h6>
                  <input
                    type="text"
                    name="nomrr"
                    value={formData.nomrr || ''}
                    onChange={handleInputChange}
                    placeholder="إسم المفوّض"
                    className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                    required
                  />
                </div>
                <div className="md:w-1/2 md:pl-2">
                  <h6 className="text-black text-2xl mb-5" > لقب المفوّض</h6>
                  <input
                    type="text"
                    name="prenomrr"
                    value={formData.prenomrr || ''}
                    onChange={handleInputChange}
                    placeholder="لقب المفوّض"
                    className="bg-white rounded-full text-2xl w-full p-2 mb-5"
                    required
                  />
                </div>
              </div>

              <h6 className="text-black text-2xl mb-5">رقم الهاتف</h6>
              <input
                type="number"
                name="numtelrr"
                value={formData.numtelrr || ''}
                onChange={handleInputChange}
                placeholder="رقم الهاتف"
                className="bg-white rounded-full text-2xl w-full p-2 mb-5"
              />

              <h6 className="text-black text-2xl mb-5">البريد الإلكتروني</h6>
              <input
                type="email"
                name="adresseemailrr"
                value={formData.adresseemailrr || ''}
                onChange={handleInputChange}
                placeholder="البريد الإلكتروني"
                className="bg-white rounded-full text-2xl w-full p-2 mb-5"
              />

              <div className="mb-5">
                <h6 className="text-black text-2xl mb-5">اختار الخيار المفضل</h6>
                <select
                  name="regionr"
                  value={formData.regionr || ''}
                  onChange={handleInputChange}
                  className="bg-white rounded-full text-2xl w-full p-2"
                  required
                >
                  <option value="" disabled>
                    اختر خيارًا
                  </option>
                  <option value="Tunis">تونس</option>
                  <option value="Ariana">أريانة</option>
                  <option value="Ben Arous">بن عروس</option>
                  <option value="Manouba">منوبة</option>
                  <option value="Nabeul">نابل</option>
                  <option value="Zaghouan">زغوان</option>
                  <option value="Bizerte">بنزرت</option>
                  <option value="Beja">باجة</option>
                  <option value="Jendouba">جندوبة</option>
                  <option value="Kairouan">القيروان</option>
                  <option value="Kasserine">القصرين</option>
                  <option value="Sidi Bouzid">سيدي بوزيد</option>
                  <option value="Siliana">سليانة</option>
                  <option value="Mahdia">المهدية</option>
                  <option value="Monastir">المنستير</option>
                  <option value="Sousse">سوسة</option>
                  <option value="Kebili">قبلي</option>
                  <option value="Tozeur">توزر</option>
                  <option value="Gabes">قابس</option>
                  <option value="Medenine">مدنين</option>
                  <option value="Tatouine">تطاوين</option>
                  <option value="Sfax">صفاقس</option>
                  <option value="Gafsa">قفصة</option>
                  <option value="Kef">الكاف</option>
                </select>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="flex items-center border-2 border-black bg-green-600 hover:bg-black rounded-full text-white text-2xl p-2 mt-4"
                  disabled={loading}
                >
                  {loading ? 'جاري التحميل...' : 'تسجيل'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table to Display Mofawadhiya Data */}
      <div className="mt-10 w-full px-4">
        <h3 className="text-2xl text-indigo-900 mb-4">قائمة المفوّضيات</h3>
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">معرّف</th>
              <th className="px-4 py-2 text-left">إسم المفوّض</th>
              <th className="px-4 py-2 text-left">لقب المفوّض</th>
              <th className="px-4 py-2 text-left">رقم الهاتف</th>
              <th className="px-4 py-2 text-left">البريد الإلكتروني</th>
              <th className="px-4 py-2 text-left">المنطقة</th>
            </tr>
          </thead>
          <tbody>
            {mofawadhiyaList.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{item.idsrr}</td>
                <td className="px-4 py-2">{item.nomrr}</td>
                <td className="px-4 py-2">{item.prenomrr}</td>
                <td className="px-4 py-2">{item.numtelrr}</td>
                <td className="px-4 py-2">{item.adresseemailrr}</td>
                <td className="px-4 py-2">{item.regionr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Amofawadhiya;
