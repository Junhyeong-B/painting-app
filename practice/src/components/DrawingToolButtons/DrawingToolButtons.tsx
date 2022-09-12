import { useState } from 'react';
import { css, cx } from '@emotion/css';
import {
  BsPencil,
  BsEraser,
  BsSquare,
  BsSquareFill,
  BsCircle,
  BsCircleFill,
  BsPaintBucket,
  BsArrow90DegLeft,
} from 'react-icons/bs';

import Button from 'components/Button';

import useToolStore, { ToolType } from 'store/tool';
import { tools } from './constants';

const getIcon = (tool: ToolType) => {
  switch (tool) {
    case 'pencil':
      return <BsPencil size={20} />;
    case 'eraser':
      return <BsEraser size={20} />;
    case 'square':
      return <BsSquare size={20} />;
    case 'circle':
      return <BsCircle size={20} />;
    case 'square-fill':
      return <BsSquareFill size={20} />;
    case 'circle-fill':
      return <BsCircleFill size={20} />;
    case 'paint':
      return <BsPaintBucket size={20} />;
    case 'undo':
      return <BsArrow90DegLeft size={20} />;
    default:
      return null;
  }
};

const DrawingToolButtons = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setTool } = useToolStore();

  const onClickTool = (tool: ToolType, index: number) => {
    setTool(tool);
    setCurrentIndex(index);
  };

  return (
    <div className={containerCss}>
      {tools.map((tool, index) => (
        <Button
          key={tool}
          onClick={onClickTool.bind(null, tool, index)}
          className={cx({ [selectedButtonCss]: index === currentIndex })}
          full
        >
          {getIcon(tool)}
        </Button>
      ))}
    </div>
  );
};

export default DrawingToolButtons;

const containerCss = css`
  width: 120px;
  height: 250px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const selectedButtonCss = css`
  background-color: aliceblue;
`;
