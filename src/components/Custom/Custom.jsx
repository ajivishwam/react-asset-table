import React from 'react';

const CustomTemplate = ({ items, rowData }) => {

  return (
    <div className="flex">
        <div className="flex-shrink-0 w-10 h-10">
            <img
                className="w-full h-full rounded-full"
                src={rowData[items[0]]}
                alt=""
            />
        </div>
        <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
            {rowData[items[1]]}
            </p>
        </div>
    </div>
  );
};

export default CustomTemplate;
