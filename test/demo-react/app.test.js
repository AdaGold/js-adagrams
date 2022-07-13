import React from 'react';
import App from 'demo-react/app';
import { render } from 'ink-testing-library';
import { expectRenderToMatchSnapshot } from './expect-render';

const rightArrow = (renderResult, jsx) => {
  const { stdin, rerender } = renderResult;
  stdin.write('\u001B[C');
  rerender(jsx);  // Hack: Force React/Ink to run useEffect handlers so the useInput callback gets registered.
}
const enter = stdin => stdin.write('\r');

describe('Adagrams App', () => {
  it('Renders correctly in the default state', () => {
    expectRenderToMatchSnapshot(<App />);
  });

  it('Highlights the next item on right-arrow press', () => {
    const jsx = <App />;
    const rr = render(jsx);
    rr.rerender(jsx); // Hack: Force React/Ink to run useEffect handlers so the useInput callback gets registered.

    rightArrow(rr, jsx);

    expect(rr.lastFrame()).toMatchSnapshot();
  });

  it('Highlights quit on two right-arrow presses', () => {
    const jsx = <App />;
    const rr = render(jsx);
    rr.rerender(jsx); // Hack: Force React/Ink to run useEffect handlers so the useInput callback gets registered.

    rightArrow(rr, jsx);
    rightArrow(rr, jsx);

    expect(rr.lastFrame()).toMatchSnapshot();
  });

  it('Quits if quit is selected', () => {
    const jsx = <App />;
    const rr = render(jsx);
    rr.rerender(jsx); // Hack: Force React/Ink to run useEffect handlers so the useInput callback gets registered.

    rightArrow(rr, jsx);
    rightArrow(rr, jsx);
    enter(rr.stdin);

    expect(rr.lastFrame()).toMatchSnapshot();
  });

  it('Shows the help screen', () => {
    const jsx = <App />;
    const rr = render(jsx);
    rr.rerender(jsx); // Hack: Force React/Ink to run useEffect handlers so the useInput callback gets registered.

    rightArrow(rr, jsx);
    enter(rr.stdin);

    expect(rr.lastFrame()).toMatchSnapshot();
  });
});
