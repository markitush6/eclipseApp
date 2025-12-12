import {
  KeyboardAvoidingView,
  Platform,
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
    <KeyboardAvoidingView
      style={styleContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {!!label && <Text style={styles.text}>{label}</Text>}
      <View style={[styleInput]}>
        <TextInput {...props} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 18,
  },
});

export default UIInput;
