import { createStackNavigator } from "react-navigation"
import { WelcomeScreen } from "../screens/welcome-screen"
import { DemoScreen } from "../screens/demo-screen"
import { FilterScreen } from "../screens/Filter-screen"

export const PrimaryNavigator = createStackNavigator(
  {
    welcome: { screen: WelcomeScreen },
    first: { screen: DemoScreen },
    second: { screen: FilterScreen }
  },
  {
    headerMode: "none",
  },
)

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["welcome"]
