/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import CropScreen from "./cropdemo"

import { name as appName } from "./app.json";

// AppRegistry.registerComponent(appName, () => CropScreen);
AppRegistry.registerComponent(appName, () => App);