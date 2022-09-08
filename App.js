import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { HomeScreen, AuthLoading, BoardinScreen, TerminalScreen } from "./screens";

const OnRootNavigator = createStackNavigator(
  {
    inicio: {
      screen: HomeScreen,
      navigationOptions: { headerShown: false },
    },
    terminal: {
      screen: TerminalScreen,
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