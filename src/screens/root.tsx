import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "@screens/Login";
// import Register from '@screen/Register';
// import Home from '@screen/Home';
// import Splash from '@screen/Splash';

export type RootParamList = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
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
        {/* <RootStack.Screen name="HomeScreen" component={Home} /> */}
        <RootStack.Screen name="LoginScreen" component={Login} />
        {/* <RootStack.Screen name="RegisterScreen" component={Register} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

// const Screens = () => {
//   return <Text>App</Text>;
// };

export default Screens;
