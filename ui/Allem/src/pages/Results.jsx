import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const predictionResults = location.state?.results;

  return (
    <div className="max-w-2xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6 text-white bg-stone-900 w-fit px-10 py-2 rounded-4xl">النتائج</h1>
      {predictionResults ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-purple-200">
              <thead className="bg-stone-900">
                <tr>
                  <th className="px-6 py-3 text-right text-sm font-medium text-white uppercase tracking-wider">
                    النص
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-white uppercase tracking-wider">
                    الشعور
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-purple-100">
                {predictionResults.predictions.map((item, index) => (
                  <tr key={index} className="hover:bg-purple-50">
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-stone-900">
                      {item.review}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            item.sentiment === 'ايجابي'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-stone-200 text-stone-800'
                          }`}
                      >
                        {item.sentiment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-red-500">No results available</p>
      )}
    </div>
  );
};

export default Results;