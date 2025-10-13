import React from "react";

const TableRow = ({ product }) => {
  const { _id, name, price } = product;
  const handlePost = () => {};
  return (
    <div>
      <tbody className='divide-y divide-gray-200'>
        <tr>
          <td className='sticky inset-y-0 left-0 bg-white px-4 py-2'>
            <label className='sr-only' for='Row1'>
              Row 1
            </label>

            <input
              className='h-5 w-5 rounded border-gray-200'
              type='checkbox'
              id='Row1'
            />
          </td>
          <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
            {name}
          </td>
          <td className='whitespace-nowrap px-4 py-2 text-gray-700'>{price}</td>
          <td className='whitespace-nowrap px-4 py-2 text-gray-700'></td>
          <td className='whitespace-nowrap px-4 py-2 text-gray-700'>$783.23</td>
          <td className='whitespace-nowrap px-4 py-2'>
            <button className='btn' onClick={() => handlePost(_id)}>
              Normal
            </button>
          </td>
        </tr>
      </tbody>
    </div>
  );
};

export default TableRow;
