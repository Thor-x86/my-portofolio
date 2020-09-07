/**
 *  This component is for testing.
 *  Use this to simulate very long page.
**/

/**
 *  @typedef {object} Props (Anything you can put to this component)
 *  @property {number} linesCount
**/

import React from 'react';

/**
 *  Generate lines of dummy texts
 *  
 *  @param {number} linesCount
 *  @returns {string[]}
 */
function generate(linesCount) {
  let linesOfText = [];

  for(let iter = 1; iter <= linesCount; iter++) {
    let newLine = `This is #${iter} line.`;

    if(iter < linesCount) {
      newLine += ' Keep scrolling...';
    } else {
      newLine += ' Stop! you\'re done.'
    }

    linesOfText.push(newLine);
  }

  return linesOfText;
}

/**
 *  Simulates very long text to test scrolling.
 *  
 *  @param {Props} props
 */
function DummyLongText(props) {
  const linesCount = props.linesCount || 1024;
  return (
    <div>
      {generate(linesCount).map(
        (eachLine, index) => {
          return (<div key={index}>{eachLine}</div>);
        }
      )}
    </div>
  );
}

export default DummyLongText;