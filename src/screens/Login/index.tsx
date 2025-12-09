import UIInput from "@components/ui/Input";
import UIButton from "@components/ui/UIButton";
import UIText from "@components/ui/UIText";
import useColors from "@hooks/hook.color";
import { Image, StyleSheet, View } from "react-native";

type Props = {};

const Login = ({}: Props) => {
  const colors = useColors();
  return (
    <View style={styles.container}>
      <View style={[styles.form, { backgroundColor: colors.secondary }]}>
        <Image
          source={require("@assets/images/logo.png")}
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          <UIInput
            placeholder="Email"
            autoCapitalize="none"
            styleInput={[styles.input, { borderColor: colors.grey }]}
          />
          <UIInput
            placeholder="Password"
            autoCapitalize="none"
            styleInput={[styles.input, { borderColor: colors.grey }]}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <UIButton
          colorText={colors.white}
          onPress={() => {}}
          colorButton={colors.primary}
        >
          Login
        </UIButton>
        <UIText color={colors.primary} style={styles.text}>
          Registrate
        </UIText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 48,
    marginTop: 107,
    gap: 41,
    paddingBottom: 149,
  },
  form: {
    marginBottom: 107,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderWidth: StyleSheet.hairlineWidth,
    paddingTop: 100,
    alignItems: "center",
  },
  buttonContainer: {
    paddingHorizontal: 48,
    width: "100%",
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});

export default Login;
