import Card from "@components/ui/card";
import Header from "@components/ui/header";
import UIText from "@components/ui/UIText";
import useColors from "@hooks/hook.color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useGetMolesQuery } from "@redux/service/apiMole";
import { RootParamList } from "@screens/root";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/EvilIcons";

type Props = NativeStackScreenProps<RootParamList, "HomeScreen">;

const Home = ({ navigation }: Props) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [userId, setUser_id] = useState(0);
  const { data } = useGetMolesQuery(userId);
  useEffect(() => {
    const dataUserId = async () => {
      const user_id = await AsyncStorage.getItem("user_id");
      if (user_id) {
        setUser_id(parseInt(user_id));
      }
    };
    dataUserId();
  }, []);
  console.log(data);

  return (
    <>
      <View
        style={{ paddingTop: insets.top, backgroundColor: colors.secondary }}
      >
        <Header
          backgroundColor={colors.secondary}
          renderLeft={() => (
            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.removeItem("user_id");
                navigation.reset({
                  index: 0,
                  routes: [{ name: "LoginScreen" }],
                });
              }}
            >
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
        {!!data && data?.historial.length > 0 ? (
          <>
            <Text style={styles.text}>MIS LUNARES</Text>
            <FlatList
              data={data?.historial}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Card
                  title={item?.nombre}
                  image={{ uri: item?.imagen }}
                  style={{ marginVertical: 16 }}
                  onPress={() =>
                    navigation.navigate("DetailsScreen", {
                      mole: {
                        name: item?.nombre,
                        image: { uri: item?.imagen },
                        description: item?.descripcion,
                        percentage: item?.probabilidad,
                        id: item?.lunar_id,
                        resultado: item?.resultado,
                        user_id: userId,
                      },
                    })
                  }
                />
              )}
            />
          </>
        ) : (
          <UIText style={styles.text}>No hay lunares</UIText>
        )}
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
