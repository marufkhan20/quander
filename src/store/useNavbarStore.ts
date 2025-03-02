import { create } from "zustand";

interface IState {
  open?: boolean;
  challengeId?: string;
  challengeName?: string;
  filterTag?: string;
}

interface AppState extends IState {
  updateInfo: (data: IState) => void;
}

export const useNavbarStore = create<AppState>((set) => ({
  open: false,
  challengeId: "",
  challengeName: "",
  filterTag: "",
  updateInfo: (data) => set((state) => ({ ...state, ...data })),
}));
