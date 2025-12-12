import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MoleModel } from "@models/models.mole";
import Login from "@screens/Login";
import Details from "./Details";
import Home from "./Home";
import Register from "./Register";
// import Register from '@screen/Register';
// import Home from '@screen/Home';
// import Splash from '@screen/Splash';

export type RootParamList = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  DetailsScreen: { mole?: MoleModel };
};

const RootStack = createNativeStackNavigator<RootParamList>();

const Screens = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        id="RootNavigator"
        screenOptions={{ headerShown: false }}
      >
        {/* <RootStack.Screen name="SplashScreen" component={Splash} /> */}
        <RootStack.Screen name="LoginScreen" component={Login} />
        <RootStack.Screen name="HomeScreen" component={Home} />
        <RootStack.Screen name="DetailsScreen" component={Details} />
        <RootStack.Screen name="RegisterScreen" component={Register} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

// const Screens = () => {
//   return <Text>App</Text>;
// };

export default Screens;
