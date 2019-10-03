/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import Filters from "./demo";
import CropScreen from "./cropdemo";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Filters style={{ flex: 1 }} />
          {/* <CropScreen style={{ flex: 1 }} /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
