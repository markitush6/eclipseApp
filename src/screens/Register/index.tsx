import UIInput from "@components/ui/Input";
import UIButton from "@components/ui/UIButton";
import UIText from "@components/ui/UIText";
import useColors from "@hooks/hook.color";
import { RegisterPayload } from "@models/model.auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRegisterMutation } from "@redux/service/apiAuth";
import { RootParamList } from "@screens/root";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootParamList, "RegisterScreen">;

const Register = ({ navigation }: Props) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [registerMutation] = useRegisterMutation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterPayload>();
  const onSubmit = async (data: RegisterPayload) => {
    try {
      const response = await registerMutation(data);
      console.log(response);
      await AsyncStorage.setItem("user_id", response.data?.user_id?.toString());
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    } catch (error) {
      console.log(error);
      setError("email", {
        type: "manual",
        message: "El correo electronico ya esta en uso",
      });
    }
  };
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={[styles.form, { backgroundColor: colors.secondary }]}>
        <Image
          source={require("@assets/images/logo.png")}
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <UIInput
                placeholder="Username"
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
              <View>
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
                <UIText style={{ fontSize: 12 }} color={colors.danger}>
                  {errors.email?.message}
                </UIText>
              </View>
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
