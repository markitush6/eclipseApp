import UIInput from "@components/ui/Input";
import UIButton from "@components/ui/UIButton";
import UIText from "@components/ui/UIText";
import useColors from "@hooks/hook.color";
import { LoginPayload } from "@models/model.auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "@screens/root";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet, View } from "react-native";

type Props = NativeStackScreenProps<RootParamList, "RegisterScreen">;

const Login = ({ navigation }: Props) => {
  const colors = useColors();
  const [inputFocus, setInputFocus] = useState<number>(0);
  const { control, handleSubmit } = useForm<LoginPayload>();
  const onSubmit = useCallback((data: LoginPayload) => {
    console.log("hola", data);
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.form, { backgroundColor: colors.secondary }]}>
        <Image
          source={require("@assets/images/logo.png")}
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <UIInput
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor={
                  inputFocus === 1 ? colors.primary : colors.grey
                }
                styleInput={[
                  styles.input,
                  {
                    borderColor:
                      inputFocus === 1 ? colors.primary : colors.grey,
                  },
                ]}
                onChangeText={field.onChange}
                onFocus={() => setInputFocus(1)}
                onBlur={() => setInputFocus(0)}
                value={field.value}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <UIInput
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry
                placeholderTextColor={
                  inputFocus === 2 ? colors.primary : colors.grey
                }
                onFocus={() => setInputFocus(2)}
                onBlur={() => setInputFocus(0)}
                styleInput={[
                  styles.input,
                  {
                    borderColor:
                      inputFocus === 2 ? colors.primary : colors.grey,
                  },
                ]}
                onChangeText={field.onChange}
                value={field.value}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <UIButton
          colorText={colors.white}
          onPress={handleSubmit(onSubmit)}
          colorButton={colors.primary}
        >
          Enviar
        </UIButton>
        <UIText
          color={colors.primary}
          style={styles.text}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          Registrate
        </UIText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
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
    paddingVertical: 5,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});

export default Login;
