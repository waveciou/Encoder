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
    <div className="tw-my-4 tw-text-white">
      <div className="tw-flex tw-items-center tw-justify-between">
        <label className="tw-block tw-mb-3" htmlFor="output-area">
          Output :
        </label>
        {textOutput !== '' && (
          <div className="tw-flex tw-items-center tw-mb-3 mobile:tw-mb-0">
            <div className={`${processTime === null ? 'tw-invisible' : ''}`}>
              <div className="before-font-material tw-flex tw-items-center tw-mr-2.5 tw-text-small before:tw-content-['\e8b5'] before:tw-mr-1 before:tw-block before:tw-text-desktop">
                <label className="mobile:before:tw-content-['Time:']">
                  {processTime} ms
                </label>
              </div>
            </div>
            <CopyToClipboard text={textOutput} onCopy={() => copiedHandler()}>
              <div className={`${isCopied ? 'tw-text-yellow' : ''}`}>
                <button
                  type="button"
                  title="Copy"
                  className="before-font-material tw-flex tw-items-center tw-text-small tw-text-left tw-text-inherit before:tw-content-['\e14d'] before:tw-mr-1 before:tw-block before:tw-text-desktop"
                >
                  <span className="tw-block tw-min-w-[50px] tw-text-inherit">
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
        className="tw-w-full tw-h-48 tw-py-2.5 tw-px-4 tw-block tw-overflow-x-hidden tw-overflow-y-auto tw-text-yellow tw-bg-black tw-break-words tw-tracking-wide tw-border tw-border-white tw-border-solid tw-rounded-md tw-resize-none"
      >
        {textOutput}
      </div>
    </div>
  );
};

export default outputArticle;
