import Card from "@components/ui/card";
import Header from "@components/ui/header";
import useColors from "@hooks/hook.color";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "@screens/root";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/EvilIcons";

type Props = NativeStackScreenProps<RootParamList, "HomeScreen">;

const Home = ({ navigation }: Props) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  return (
    <>
      <View
        style={{ paddingTop: insets.top, backgroundColor: colors.secondary }}
      >
        <Header
          backgroundColor={colors.secondary}
          renderLeft={() => (
            <TouchableOpacity>
              <Icon name="user" size={30} color={colors.grey} />
            </TouchableOpacity>
          )}
          renderRight={() => (
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailsScreen")}
            >
              <Icon name="plus" size={30} color={colors.grey} />
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>MIS LUNARES</Text>
        <Card
          title="Lunar 1"
          image={require("@assets/images/lunar.jpeg")}
          style={{ marginVertical: 16 }}
          onPress={() =>
            navigation.navigate("DetailsScreen", {
              mole: {
                name: "Lunar 1",
                image: require("@assets/images/lunar.jpeg"),
                description: "Lunar 1",
                percentage: 10.5,
                id: 1,
              },
            })
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 77,
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 20,
  },
});

export default Home;
