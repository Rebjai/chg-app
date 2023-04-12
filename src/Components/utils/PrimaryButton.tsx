import React from 'react';

type PrimaryButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'submit'|'button'| 'reset'
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onClick = ()=>console.log('btn'),  children, type = undefined }) => {
  return (
    <button
    type={type}
      className={"capitalize text-white font-bold py-2 px-4 rounded "+ (type == 'button' ||
      type == undefined?'bg-purple-700 hover:bg-purple-600': 
      type =='reset'?'bg-red-500 hover:bg-red-400':
      'bg-green-600 hover:bg-green-500')}
      onClick={onClick}
    >
      <span className="ml-2">{children}</span>
    </button>
  );
};

export default PrimaryButton;
