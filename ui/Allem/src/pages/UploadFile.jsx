import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('اختر ملف CSV صالح');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('اختر ملف اولاً');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/predict/csv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('فشل الرفع');
      }

      const data = await response.json();
      console.log('Success:', data);
      
      // Navigate to results page with the data
      navigate('/results', { state: { results: data } });
    } catch (err) {
      setError('فشل رفع الملف: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="max-w-xl mx-auto p-6 h-fit pt-42">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer
              ${file ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}
              hover:bg-gray-100 transition-all duration-300 ease-in-out`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className={`w-10 h-10 mb-3 ${file ? 'text-green-500' : 'text-gray-400'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">اضغط للرفع</span> او اسحب و ضع
              </p>
              <p className="text-xs text-gray-500">ملفات CSV فقط</p>
              {file && (
                <p className="text-sm text-green-500 mt-2">
                  الملف المختار: {file.name}
                </p>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept=".csv"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <button
          type="submit"
          disabled={!file || loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium
            ${
              !file || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }
            transition-colors duration-300 ease-in-out`}
        >
          {loading ? 'يتم الرفع...' : 'ارفع ملفك'}
        </button>
      </form>
    </div>
  );
};

export default UploadFile;
