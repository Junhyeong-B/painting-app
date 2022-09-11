import { css } from '@emotion/css';
import { MouseEventHandler, PropsWithChildren } from 'react';

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: string;
  full?: boolean;
}

const Button = ({
  onClick,
  children,
  color,
  full,
}: PropsWithChildren<Props>) => {
  return (
    <button onClick={onClick} className={containerCss(color, full)}>
      {children}
    </button>
  );
};

export default Button;

const containerCss = (color?: string, full?: boolean) => css`
  background-color: ${color ?? 'initial'};
  width: ${full ? '100%' : '30px'};
  height: ${full ? '100%' : '30px'};
  border-radius: 3px;
  border: 2px solid #333;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.4;
  }
`;
