import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { RootParamList } from "../root";

type Props = NativeStackScreenProps<RootParamList, "SplashScreen">;

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("LoginScreen");
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("@assets/images/logo.png")}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
