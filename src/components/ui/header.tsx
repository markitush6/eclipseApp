import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";

type Props = {
  title?: string;
  onPressBack?: () => void;
  renderLeft?: () => React.ReactNode;
  renderRight?: () => React.ReactNode;
  backgroundColor?: string;
  colorText?: string;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
};

const Header = ({
  title,
  onPressBack,
  renderLeft,
  renderRight,
  backgroundColor,
  colorText,
  style,
  styleText,
}: Props) => {
  return (
    <View
      style={[styles.container, style, { backgroundColor: backgroundColor }]}
    >
      <View style={styles.side}>
        {!!onPressBack && (
          <TouchableOpacity onPress={onPressBack}>
            <Icon name="chevron-left" size={40} color="black" />
          </TouchableOpacity>
        )}
        {!!renderLeft && renderLeft()}
      </View>

      <View style={styles.center}>
        <Text style={[styles.text, styleText, { color: colorText }]}>
          {title}
        </Text>
      </View>

      <View style={styles.side}>{!!renderRight && renderRight()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  side: {
    width: 50, // ancho fijo para que el centro se centre correctamente
    alignItems: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});
export default Header;
