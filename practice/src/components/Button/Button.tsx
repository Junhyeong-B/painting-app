import { css } from '@emotion/css';
import { MouseEventHandler, PropsWithChildren } from 'react';

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: string;
}

const Button = ({ onClick, children, color }: PropsWithChildren<Props>) => (
  <button onClick={onClick} className={containerCss(color)}>
    {children}
  </button>
);

export default Button;

const containerCss = (color?: string) => css`
  background-color: ${color ?? 'initial'};
  width: 30px;
  height: 30px;
  border-radius: 3px;
  border: 2px solid #333;
`;
