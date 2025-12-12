import { ImageSource } from "react-native";

export type MoleModel = {
  id: number;
  name: string;
  image: ImageSource;
  description: string;
  percentage?: number;
};
