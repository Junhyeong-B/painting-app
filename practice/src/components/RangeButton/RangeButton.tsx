import { ChangeEvent } from 'react';
import useDrawStore from 'store';

const RangeButton = () => {
  const { range, setRange } = useDrawStore();

  const onChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
    setRange(e.currentTarget.value);
  };

  return (
    <div>
      <div>선 굵기</div>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={range}
        onChange={onChangeRange}
      />
    </div>
  );
};

export default RangeButton;
