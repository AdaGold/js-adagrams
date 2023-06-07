import React from 'react';
import Button from 'demo-react/components/button';
import { expectRenderToMatchSnapshot } from '../expect-render';

describe('Button rendering', () => {
  it('Renders correctly when not selected', () => {
    expectRenderToMatchSnapshot(<Button>Not Selected</Button>);
  });

  it('Renders correctly when selected', () => {
    expectRenderToMatchSnapshot(<Button isSelected={ true }>Selected</Button>);
  });

  it('Renders correctly when given a color', () => {
    expectRenderToMatchSnapshot(<Button color='red'>Selected</Button>);
  });

  it('Renders correctly when selected and given a color', () => {
    expectRenderToMatchSnapshot(<Button isSelected={ true } color='red'>Selected</Button>);
  });
});