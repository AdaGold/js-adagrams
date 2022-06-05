import React from 'react';
import App from 'demo-react/ui';
import { render } from 'ink-testing-library';
import { expectRenderToMatchSnapshot } from './expect-render';

describe('Button rendering', () => {
  it('Renders correctly in the default state', () => {
    expectRenderToMatchSnapshot(<App />);
  });

  it.skip('Highlights the next item on right-arrow press', () => {
    const { stdin, lastFrame } = render(<App />);

    stdin.write(String.fromCharCode(13) + String.fromCharCode(10)); // Try to send [Enter]

    expect(lastFrame()).toMatchSnapshot();
  });
});
