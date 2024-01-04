import styled, {
    keyframes,
} from 'styled-components';
import CSS from 'csstype';

export const SpinnerAnimation = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
`;

export const InputHighlighter = keyframes`
    from { 
      background: '#1976d2'; 
    }
    to { 
        width: 0; 
        background: transparent; 
    }
`;

      // background: ${props => props.theme.primaryColor}; 
