import useColors from "@hooks/hook.color";
import { ColorType } from "@theme/color";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

type Props = TextProps & {
  color?: keyof ColorType | string;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

const UIText = ({ color, children, style, ...props }: Props) => {
  const colors = useColors();
  const colorValue =
    color && color in colors
      ? colors[color as keyof ColorType]
      : color ?? colors.black;

  return (
    <Text style={[styles.text, style, { color: colorValue }]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});

export default UIText;
