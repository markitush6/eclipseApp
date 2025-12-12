import UIInput from "@components/ui/Input";
import UIButton from "@components/ui/UIButton";
import UIText from "@components/ui/UIText";
import useColors from "@hooks/hook.color";
import { RegisterPayload } from "@models/model.auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "@screens/root";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet, View } from "react-native";

type Props = NativeStackScreenProps<RootParamList, "RegisterScreen">;

const Register = ({ navigation }: Props) => {
  const colors = useColors();
  const { control, handleSubmit } = useForm<RegisterPayload>();
  const onSubmit = (data: RegisterPayload) => {
    console.log("hola", data);
  };
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
            name="name"
            render={({ field }) => (
              <UIInput
                placeholder="Name"
                autoCapitalize="none"
                placeholderTextColor={colors.grey}
                styleInput={[styles.input, { borderColor: colors.grey }]}
                onChangeText={field.onChange}
                value={field.value}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <UIInput
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor={colors.grey}
                styleInput={[styles.input, { borderColor: colors.grey }]}
                onChangeText={field.onChange}
                value={field.value}
                {...field}
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
                placeholderTextColor={colors.grey}
                styleInput={[styles.input, { borderColor: colors.grey }]}
                onChangeText={field.onChange}
                value={field.value}
                {...field}
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
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Login
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

export default Register;
