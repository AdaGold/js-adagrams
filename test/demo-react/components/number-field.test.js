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
  });

  it('supports backspace (mac delete)', () => {
    const jsx = <NumberField currentValue={ 5 } isActive >Description of Field</NumberField>;
    const { stdin, rerender, lastFrame } = render(jsx);
    rerender(jsx); // Hack: Force React/Ink to run useEffect handlers so the useInput callback gets registered.

    stdin.write('6');
    stdin.write('\u007F');
    stdin.write('8');

    expect(lastFrame()).not.toContain('6');
    expect(lastFrame()).toContain('8');
  });

  it('supports backspace', () => {
    const jsx = <NumberField currentValue={ 5 } isActive >Description of Field</NumberField>;
    const { stdin, rerender, lastFrame } = render(jsx);
    rerender(jsx); // Hack: Force React/Ink to run useEffect handlers so the useInput callback gets registered.

    stdin.write('6');
    stdin.write('\u0008');
    stdin.write('8');

    expect(lastFrame()).not.toContain('6');
    expect(lastFrame()).toContain('8');
  });

  it('commits the string on return', () => {
    const dispatch = jest.fn();
    const jsx = (
      <NumberField
        currentValue={ 5 }
        isActive
        dispatch={ dispatch }
        actionType='any-action'
      >
        Description of Field
      </NumberField>
    );
    const { stdin, rerender, lastFrame } = render(jsx);
    rerender(jsx); // Hack: Force React/Ink to run useEffect handlers so the useInput callback gets registered.

    stdin.write('6');
    stdin.write('\r');

    expect(dispatch).toHaveBeenCalledWith({ type: 'any-action', payload: 6 });
  });

  it('supports multiple characters at once (paste)', () => {
    const jsx = <NumberField currentValue={ 5 } isActive >Description of Field</NumberField>;
    const { stdin, rerender, lastFrame } = render(jsx);
    rerender(jsx); // Hack: Force React/Ink to run useEffect handlers so the useInput callback gets registered.

    stdin.write('700');

    expect(lastFrame()).toContain('700');
  });
});