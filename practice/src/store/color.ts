import create from 'zustand'

interface ColorState {
  color: string;
  setColor: (color: string) => void;
}

const useColorStore = create<ColorState>((set) => ({
  color: "#000",
  setColor: (color: string) => set(() => ({ color })),
}));

export default useColorStore;