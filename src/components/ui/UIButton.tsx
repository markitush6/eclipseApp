import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
} from "react-native";
import UIText from "./UIText";

type Props = PressableProps & {
  colorButton?: string;
  onPress: () => void;
  colorText?: string;
  styleText?: StyleProp<TextStyle>;
  children?: React.ReactNode;
};

const UIButton = ({
  onPress,
  colorText,
  styleText,
  colorButton,
  children,
  ...props
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: !!colorButton ? colorButton : "" },
      ]}
      {...props}
    >
      <UIText color={colorText} style={[styles.text, styleText]}>
        {children}
      </UIText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 8,
  },
  text: {
    fontSize: 18,
  },
});

export default UIButton;
