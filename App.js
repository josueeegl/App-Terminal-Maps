import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { HomeScreen, AuthLoading, BoardinScreen } from "./screens";

const OnRootNavigator = createStackNavigator(
  {
    inicio: {
      screen: HomeScreen,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: "inicio",
  }
);

const OnBoardingNavigator = createStackNavigator(
  {
    BoardindScreen: {
      screen: BoardinScreen,
      navigationOptions: { headerShown: false },
    },
  },
  {
    initialRouteName: "BoardindScreen",
  }
);
const BaseNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    OnBoarding: OnBoardingNavigator,
    Root: OnRootNavigator,
  },
  {
    initialRouteName: "AuthLoading",
  }
);
export default createAppContainer(BaseNavigator);