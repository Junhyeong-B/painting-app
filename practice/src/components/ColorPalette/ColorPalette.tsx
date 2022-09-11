import { css } from '@emotion/css';
import Button from 'components/Button';

import { palette } from './constants';
import { useColorStore } from 'store/index';
import { ChangeEvent, useState } from 'react';

const ColorPalette = () => {
  const [pickedColor, setPickedColor] = useState('#000');
  const { setColor } = useColorStore();

  const onChangeColorInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPickedColor(e.currentTarget.value);
    setColor(e.currentTarget.value);
  };

  return (
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
  );
};

export default ColorPalette;

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
