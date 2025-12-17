import Header from "@components/ui/header";
import UIInput from "@components/ui/Input";
import UIButton from "@components/ui/UIButton";
import UIText from "@components/ui/UIText";
import useColors from "@hooks/hook.color";
import { MoleModel } from "@models/models.mole";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  useGetMolesQuery,
  usePostMoleIaMutation,
  usePostMoleMutation,
} from "@redux/service/apiMole";
import { RootParamList } from "@screens/root";
import { Asset } from "expo-asset";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/EvilIcons";

type Props = NativeStackScreenProps<RootParamList, "DetailsScreen">;

const Details = ({ navigation, route }: Props) => {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [image, setImage] = useState();
  const mole = route.params?.mole;
  const asset = mole ? Asset.fromModule(mole?.image) : null;
  const [postMoleIA] = usePostMoleIaMutation();
  const [postMole] = usePostMoleMutation();
  const { control, handleSubmit } = useForm<MoleModel>();
  const [userId, setUser_id] = useState(0);
  const { refetch } = useGetMolesQuery(userId);
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Necesitamos acceso a tus fotos.");
      return false;
    }
    return true;
  };
  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri); // aquí tienes la URI de la imagen seleccionada
      setImage(result.assets[0].uri); // guarda en un estado
    }
  };

  const onSubmit = useCallback(
    async (formMole: MoleModel) => {
      console.log("Entra");

      const formData = new FormData();
      const fileName = `mole_${userId}_${Date.now()}.jpg`;
      formData.append("nom", formMole?.name ?? "");
      formData.append("descripcio", formMole?.description ?? "");
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: fileName,
      });
      formData.append("user_id", userId.toString());
      if (!!image) {
        console.log(">Entra 2");
        try {
          const response = await postMoleIA(formData).unwrap();
          if (response?.error?.status === 400) {
            Alert.alert("Error", response?.error?.data?.error);
          } else {
            await refetch();
            navigation.reset({
              index: 0,
              routes: [{ name: "HomeScreen" }],
            });
          }
        } catch (error) {
          console.log("Error!!!!", error);
          Alert.alert("Error", error.data.error);
        }
      } else {
        Alert.alert("Error", "No se selecciono una imagen");
      }
    },
    [image, userId]
  );
  useEffect(() => {
    const dataUserId = async () => {
      const user_id = await AsyncStorage.getItem("user_id");
      if (user_id) {
        setUser_id(parseInt(user_id));
      }
    };
    dataUserId();
  }, []);

  return (
    <>
      <View
        style={[
          {
            paddingTop: insets.top,
            backgroundColor: colors.secondary,
          },
        ]}
      >
        <Header onPressBack={() => navigation.goBack()} title="Detalles" />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={
                image
                  ? { uri: image } // Imagen seleccionada por el usuario
                  : asset
                  ? { uri: asset.uri } // Imagen del mole
                  : {
                      uri: "https://dummyimage.com/200x200/cccccc/000000.png&text=No+Image",
                    } // Placeholder
              }
              style={styles.image}
            />
            {!asset && (
              <Pressable onPress={pickImage} style={styles.pickerImage}>
                <View
                  style={[
                    styles.buttonPicker,
                    { backgroundColor: colors.secondary },
                  ]}
                >
                  <Icon name="image" size={35} color={colors.primary} />
                </View>
              </Pressable>
            )}
          </View>
          <View style={styles.containerText}>
            {!!mole ? (
              <View style={{ alignItems: "center", gap: 40 }}>
                {!!mole.name && (
                  <UIText style={styles.text}>{mole?.name}</UIText>
                )}
                {!!mole.description && (
                  <UIText style={styles.text}>{mole?.description}</UIText>
                )}
                {!!mole.resultado && (
                  <UIText
                    style={styles.text}
                    color={
                      mole?.resultado === "BENIGNO"
                        ? colors.primary
                        : colors.danger
                    }
                  >
                    {mole?.resultado}
                  </UIText>
                )}
                {!!mole?.percentage && (
                  <UIText style={styles.text}>{mole?.percentage}</UIText>
                )}
              </View>
            ) : (
              <View
                style={{ paddingHorizontal: 20, gap: 30, marginBottom: 20 }}
              >
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <UIInput
                      placeholder="Nombre (Localizacion)"
                      styleInput={[styles.input, { borderColor: colors.grey }]}
                      onChangeText={field.onChange}
                      value={field.value}
                      placeholderTextColor={colors.grey}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <UIInput
                      placeholder="Breve descripcion"
                      styleInput={[styles.input, { borderColor: colors.grey }]}
                      onChangeText={field.onChange}
                      value={field.value}
                      placeholderTextColor={colors.grey}
                    />
                  )}
                />
              </View>
            )}
          </View>
        </View>

        {!mole && (
          <View style={styles.containerButton}>
            <UIButton
              colorText={colors.white}
              onPress={handleSubmit(onSubmit)}
              colorButton={colors.primary}
            >
              GUARDAR Y VERIFICAR CON IA
            </UIButton>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    marginTop: 12,
  },
  text: {
    fontSize: 18,
  },
  content: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 30,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  pickerImage: {
    position: "absolute",
    bottom: 1,
    right: Dimensions.get("window").width * 0.15,
  },
  buttonPicker: {
    padding: 8,
    borderRadius: 100,
  },
  image: {
    width: 202,
    height: 179,
    borderRadius: 15,
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 5,
  },
  containerText: {
    marginTop: 29,
    gap: 62,
  },
  containerButton: {
    marginTop: 56,
    gap: 30,
  },
});

export default Details;
