import React from 'react';

const inputArticle = ({
  textInput,
  placeholder,
  updateTextInput,
}: {
  textInput: string;
  placeholder: string;
  updateTextInput: (payload: string) => void;
}) => {
  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const result: string = e.target.value.trim();
    updateTextInput(result);
  };

  return (
    <div className="my-4 text-white">
      <label className="block mb-3" htmlFor="input-area">
        Input :
      </label>
      <textarea
        id="input-area"
        className="w-full h-48 py-2.5 px-4 block overflow-x-hidden overflow-y-auto text-yellow bg-black break-words tracking-wide border border-white border-solid rounded-md resize-none"
        value={textInput}
        onChange={changeHandler}
        placeholder={placeholder}
      />
    </div>
  );
};

export default inputArticle;
