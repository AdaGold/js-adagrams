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
});