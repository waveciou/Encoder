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
    <div className="article">
      <div className="article__header">
        <label className="caption" htmlFor="output-area">
          Output :
        </label>
        {textOutput !== '' && (
          <div className="article__feature">
            <div
              className={`process-time ${processTime === null && 'is-hidden'}`}
            >
              <label>{processTime} ms</label>
            </div>
            <CopyToClipboard text={textOutput} onCopy={() => copiedHandler()}>
              <button
                type="button"
                title="Copy"
                className={`copy-btn ${isCopied && 'is-active'}`}
              >
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </CopyToClipboard>
          </div>
        )}
      </div>
      <div id="output-area" className="textarea">
        {textOutput}
      </div>
    </div>
  );
};

export default outputArticle;
