import { createContext, useContext } from "react";

interface LayoutContextType {
  isCollapsed: boolean;
}

export const LayoutContext = createContext<LayoutContextType | null>(null);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a ClientLayout");
  }
  return context;
};
