import React from 'react';
import NumberField from 'demo-react/components/number-field';
import { expectRenderToMatchSnapshot } from '../expect-render';
import { render } from 'ink-testing-library';

describe('NumberField', () => {
  it('renders correctly', () => {
    const jsx = <NumberField currentValue={ 5 }>Description of Field</NumberField>;
    const { lastFrame } = render(jsx);

    expect(lastFrame()).toMatchSnapshot();
  });

  it('renders correctly when active', () => {
    const jsx = <NumberField currentValue={ 5 } isActive>Description of Field</NumberField>;
    const { lastFrame } = render(jsx);

    expect(lastFrame()).toMatchSnapshot();
  });

  it('accepts input', () => {
    const jsx = <NumberField currentValue={ 5 } isActive >Description of Field</NumberField>;
    const { stdin, rerender, lastFrame } = render(jsx);
    rerender(jsx); // Hack: Force React/Ink to run useEffect handlers so the useInput callback gets registered.

    stdin.write('6');

    expect(lastFrame()).toContain('6');
  });

  it('ignores input when inactive', () => {
    const jsx = <NumberField currentValue={ 5 }>Description of Field</NumberField>;
    const { stdin, rerender, lastFrame } = render(jsx);
    rerender(jsx); // Hack: Force React/Ink to run useEffect handlers so the useInput callback gets registered.

    stdin.write('6');

    expect(lastFrame()).toContain('5');
  })
});