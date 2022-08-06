import {Reorder} from 'framer-motion';
import fieldDefinitions from './config/fieldDefinitions.json';
import CustomField from '../Custom/Custom';

const Table = ({ data, setData }) => {

  const formatCurrency = (value, currency) => {
    return Number.isInteger(parseInt(value)) ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: currency }).format(value) : '-';
  };

  const formatNumber = (num) => num.toLocaleString('en-GB', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
  });

  const millionsFormatter = (num) => {
      if(num > 999 && num < 1000000){
          return (num/1000).toFixed(2) + 'K';
      }else if(num > 1000000){
          return (num/1000000).toFixed(2) + 'M'; 
      }else if(num < 900){
          return num;
      }
  };

  const formattedValue = (format, value) => {
    let parsedValue;
    switch(format.type) {
      case 'currency':
        parsedValue = formatCurrency(value, format.currency);
        break;
      case 'percent':
        parsedValue = formatNumber(value) + '%';
        break;
      case 'millionsDecimal':
        parsedValue = millionsFormatter(value);
        break;
      default:
        parsedValue = value;
        break;
    }
    return parsedValue; 
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">
            Asset Table CryptoCurrencies</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
          >
            <Reorder.Group values={data} onReorder={setData}>
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {fieldDefinitions.map(field =>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                    {field.name}
                  </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map(cryptocurrency => 
                  <Reorder.Item as='tr' key={cryptocurrency.price_change_percentage_24h} value={cryptocurrency.price_change_percentage_24h}>
                    {fieldDefinitions.map(field =>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {field.value !== 'trend' ?
                          (field.format ? formattedValue(field.format, cryptocurrency[field.value]) : 
                          typeof field.value === 'string' ? cryptocurrency[field.value] : 
                            <CustomField items={field.value} rowData={cryptocurrency} />
                          )
                          :
                          cryptocurrency.price_change_percentage_24h > 0 ?
                          (<span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">Upward Trend</span>
                            </span>)
                          :
                          (<span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span
                                aria-hidden
                                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">Downward Trend</span>
                            </span>)
                          }
                      </td>
                    )}
                  </Reorder.Item>
                )}
              </tbody>
            </table>
            </Reorder.Group>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
