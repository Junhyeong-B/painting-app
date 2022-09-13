import { css } from '@emotion/css';
import Button from 'components/Button';

import { palette } from './constants';
import useDrawStore from 'store';
import { ChangeEvent, useState } from 'react';

const ColorPalette = () => {
  const [pickedColor, setPickedColor] = useState('#000000');
  const { color, setColor } = useDrawStore();

  const onChangeColorInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPickedColor(e.currentTarget.value);
    setColor(e.currentTarget.value);
  };

  return (
    <div>
      <div className={currentColorContainerCss}>
        <div>현재 컬러:</div>
        <div className={currentColorCss(color)} />
      </div>
      <div className={containerCss}>
        {palette.map((color) => (
          <Button
            key={color}
            color={color}
            onClick={setColor.bind(null, color)}
          />
        ))}
        <input
          type="color"
          className={colorPicker}
          value={pickedColor}
          onChange={onChangeColorInput}
        />
      </div>
    </div>
  );
};

export default ColorPalette;

const currentColorContainerCss = css`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const currentColorCss = (color: string) => css`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  border: 2px solid;
  box-sizing: border-box;
  background-color: ${color};
`;

const containerCss = css`
  width: 120px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const colorPicker = css`
  grid-column: 1 / 4;
  grid-row: 6 / 12;
  width: 100%;
  height: 100%;
  -webkit-appearance: none;
  border: none;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: 2px solid #333;
    border-radius: 3px;
  }
`;
