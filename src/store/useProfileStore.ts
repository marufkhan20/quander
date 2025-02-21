import { create } from "zustand";

interface IState {
  name?: string | undefined | null;
  image?: string | undefined | null;
  description?: string | undefined | null;
  email?: string | undefined | null;
}

interface AppState extends IState {
  updateInfo: (data: IState) => void;
}

export const useProfileStore = create<AppState>((set) => ({
  name: "",
  image: "",
  description: "",
  email: "",
  updateInfo: (data) => set((state) => ({ ...state, ...data })),
}));
