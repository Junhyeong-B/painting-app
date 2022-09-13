import create from 'zustand'

interface storeState {
  color: string;
  setColor: (color: string) => void;

  tool: ToolType;
  setTool: (tool: ToolType) => void;

  range: number;
  setRange: (range: string) => void;
}

const useDrawStore = create<storeState>((set) => ({
  color: "#000000",
  setColor: (color: string) => set(() => ({ color })),

  tool: "pencil",
  setTool: (tool: ToolType) => set(() => ({ tool })),

  range: 5,
  setRange: (range: string) => set(() => ({ range: +range })),
}));

export type ToolType =
  | 'pencil'
  | 'eraser'
  | 'square'
  | 'square-fill'
  | 'circle'
  | 'circle-fill'
  | 'paint'
  | 'undo';

export default useDrawStore;