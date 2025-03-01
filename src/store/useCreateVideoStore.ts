import { create } from "zustand";

interface IState {
  open?: boolean;
  challengeId?: string;
  challengeName?: string;
}

interface AppState extends IState {
  updateInfo: (data: IState) => void;
}

export const useCreateVideoStore = create<AppState>((set) => ({
  open: false,
  challengeId: "",
  challengeName: "",
  updateInfo: (data) => set((state) => ({ ...state, ...data })),
}));
