import create from 'zustand'

export type ToolType =
  | 'pencil'
  | 'eraser'
  | 'square'
  | 'square-fill'
  | 'circle'
  | 'circle-fill'
  | 'paint'
  | 'undo';

interface ToolState {
  tool: ToolType;
  setTool: (tool: ToolType) => void;
}

const useToolStore = create<ToolState>((set) => ({
  tool: "pencil",
  setTool: (tool: ToolType) => set(() => ({ tool })),
}));

export default useToolStore;