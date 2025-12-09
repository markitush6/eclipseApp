import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

type Props = TextInputProps & {
  label?: string;
  styleInput?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
};

const UIInput = ({ label, styleInput, styleContainer, ...props }: Props) => {
  return (
    <View style={styleContainer}>
      {!!label && <Text style={styles.text}>{label}</Text>}
      <View style={[styleInput]}>
        <TextInput {...props} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 18,
  },
});

export default UIInput;
