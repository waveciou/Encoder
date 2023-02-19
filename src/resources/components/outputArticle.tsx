import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const outputArticle = ({
  textOutput,
  processTime,
}: {
  textOutput: string;
  processTime: number | null;
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const timer = useRef<number>(0);

  const copiedHandler = useCallback(() => {
    setIsCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setIsCopied(false),
      2000
    ) as unknown as number;

    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (textOutput === '') {
      clearTimeout(timer.current);
    }
  }, [textOutput]);

  return (
    <div className="my-4 text-white">
      <div className="flex items-center justify-between">
        <label className="block mb-3" htmlFor="output-area">
          Output :
        </label>
        {textOutput !== '' && (
          <div className="flex items-center mb-3 mobile:mb-0">
            <div className={`${processTime === null ? 'invisible' : ''}`}>
              <div className="before-font-material flex items-center mr-2.5 text-small before:content-['\e8b5'] before:mr-1 before:block before:text-desktop">
                <label className="mobile:before:content-['Time:']">
                  {processTime} ms
                </label>
              </div>
            </div>
            <CopyToClipboard text={textOutput} onCopy={() => copiedHandler()}>
              <div className={`${isCopied ? 'text-yellow' : ''}`}>
                <button
                  type="button"
                  title="Copy"
                  className="before-font-material flex items-center text-small text-left text-inherit before:content-['\e14d'] before:mr-1 before:block before:text-desktop"
                >
                  <span className="block min-w-[50px] text-inherit">
                    {isCopied ? 'Copied' : 'Copy'}
                  </span>
                </button>
              </div>
            </CopyToClipboard>
          </div>
        )}
      </div>
      <div
        id="output-area"
        className="w-full h-48 py-2.5 px-4 block overflow-x-hidden overflow-y-auto text-yellow bg-black break-words tracking-wide border border-white border-solid rounded-md resize-none"
      >
        {textOutput}
      </div>
    </div>
  );
};

export default outputArticle;
