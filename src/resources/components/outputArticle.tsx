import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const outputArticle = ({ textOutput }: { textOutput: string }) => (
  <div className="article">
    <div className="article__header">
      <label className="caption" htmlFor="output-area">Output :</label>
      {
        textOutput !== '' &&
          (
            <CopyToClipboard
              text={ textOutput }
              onCopy={() => window.alert('Successfully copied')}
            >
              <button type="button" className="copy-btn">
                <span>Copy Result</span>
              </button>
            </CopyToClipboard>
          )
      }
    </div>
    <div id="output-area" className="textarea">{ textOutput }</div>
  </div>
);

export default outputArticle;