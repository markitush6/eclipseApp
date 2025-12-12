import useColors from "@hooks/hook.color";
import { Image, ImageSource } from "expo-image";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";

type Props = {
  title?: string;
  image?: ImageSource;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  onPress?: () => void;
};

const Card = ({ title, image, style, styleText, onPress }: Props) => {
  const colors = useColors();
  return (
    <View style={[styles.shadowContainer, style]}>
      <Pressable style={styles.cardContainer} onPress={onPress}>
        <View style={styles.content}>
          {image && <Image source={image} style={styles.image} />}
          <View style={styles.contentText}>
            <Text style={[styles.text, styleText]}>{title}</Text>
            <Icon name="chevron-right" size={30} color={colors.primary} />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    // SOLO sombra aquí
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,

    borderRadius: 12,
    overflow: "visible",
  },

  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  contentText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    flex: 1,
  },
  image: {
    width: 141,
    height: 115,
    borderRadius: 12,
  },
  text: {
    fontSize: 18,
  },
});

export default Card;
