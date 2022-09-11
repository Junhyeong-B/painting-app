import { css } from '@emotion/css';
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
      return <BsPencil />;
    case 'eraser':
      return <BsEraser />;
    case 'square':
      return <BsSquare />;
    case 'circle':
      return <BsCircle />;
    case 'square-fill':
      return <BsSquareFill />;
    case 'circle-fill':
      return <BsCircleFill />;
    case 'paint':
      return <BsPaintBucket />;
    case 'undo':
      return <BsArrow90DegLeft />;
    default:
      return null;
  }
};

const DrawingToolButtons = () => {
  const { setTool } = useToolStore();

  return (
    <div className={containerCss}>
      {tools.map((tool) => (
        <Button key={tool} onClick={setTool.bind(null, tool)} full>
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
