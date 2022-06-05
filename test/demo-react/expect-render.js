import { render } from 'ink-testing-library';

export function expectRenderToMatchSnapshot(jsx) {
  const { lastFrame } = render(jsx);
  expect(lastFrame()).toMatchSnapshot();
}
