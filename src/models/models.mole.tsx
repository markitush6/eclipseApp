import { ImageSource } from "react-native";

export type MoleModel = {
  user_id: number;
  id?: number;
  name: string;
  image: ImageSource;
  description: string;
  percentage?: number;
  descripcion_resultado?: string;
  resultado?: string;
};
export type HistoryModel = {
  historial: {
    lunar_id?: number;
    nombre?: string;
    imagen?: any;
    descripcion?: string;
    descripcion_resultado?: string;
    resultado?: string;
    probabilidad?: number;
  }[];
};

export type MoleModelResponse = {
  resutado?: string;
  percentage?: number;
  warnings?: string;
};
