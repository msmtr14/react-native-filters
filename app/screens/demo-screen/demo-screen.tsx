import React, { PureComponent } from "react"
import {
  Image,
  ImageStyle,
  Platform,
  TextStyle,
  ViewStyle,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  NativeModules,
  Dimensions,
} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Wallpaper } from "../../components/wallpaper"
import { Header } from "../../components/header"
import { color, spacing } from "../../theme"
import { logoIgnite, heart } from "./"
import { BulletItem } from "../../components/bullet-item"
import { Api } from "../../services/api"
import { save } from "../../utils/storage"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const BOLD: TextStyle = { fontWeight: "bold" }

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 18,
  lineHeight: 22,
  textAlign: "center",
  letterSpacing: 1.75,
}

export interface DemoScreenProps extends NavigationScreenProps<{}> {}

var ImagePicker = NativeModules.ImageCropPicker

import Icon from "react-native-vector-icons/FontAwesome";
import { ImageFilter } from "react-native-image-filter-kit";
// import FastImage from "react-native-fast-image";
const screenWidth = Dimensions.get("window").width;
export class DemoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      image: null,
      images: null,
      width: Dimensions.get("window").width,
      val: 0, // Amount
      step: 0.1,
      type: "Invert",
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0,
      rgba: 10,
      max: 10,
      min: 0,
      angle: 0,
    };
  }

  pickSingleWithCamera(cropping, mediaType = "photo") {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType
    })
      .then(image => {
        console.log("received image", image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          },
          images: null
        });
      })
      .catch(e => console.log(e));
  }

  cropLast() {
    if (!this.state.image) {
      return Alert.alert(
        "No image",
        "Before open cropping only, please select image"
      );
    }

    ImagePicker.openCropper({
      path: this.state.image.uri,
      width: 200,
      height: 200
    })
      .then(image => {
        console.log("received cropped image", image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          },
          images: null
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  pickSingle(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 5000,
      compressImageMaxHeight: 5000,
      compressImageQuality: 1,
      compressVideoPreset: "HighQuality",
      includeExif: true
    })
      .then(image => {
        console.log("received image", image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          },
          images: null
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }

  renderImage(image) {
    return (
      <Image
        style={{
          width: screenWidth * 0.96,
          height: screenWidth * 0.7,
          marginBottom: 50,
          marginTop: 20,
          resizeMode: "contain"
        }}
        source={image}
      />
    );
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf("video/") !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }

  render() {
    const {
      val,
      type,
      red,
      green,
      blue,
      alpha,
      width,
      rgba,
      data,
      step,
      max,
      min,
      angle,
      image,
      edit
    } = this.state;
    // console.warn(image)
    const uri = "./white.jpg";
    return (
     
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItem: "center"
          }}
        >
          <View>
            {this.state.image ? (
              this.renderAsset(this.state.image)
            ) : (
              <Image
                source={{
                  uri:
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXz9Pa5vsq2u8jN0dnV2N/o6u7FydPi5Onw8fS+ws3f4ee6v8v29/jY2+Hu7/Ly9PbJztbQ1dxJagBAAAAC60lEQVR4nO3b2ZaCMBREUQbDJOP//2wbEGVIFCHKTa+zH7uVRVmBBJQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCpdOzvQQqaq2KmuSrOzQ02lSeRem8rpsQq/ozg72Kj4UkAxEev8awnzs7P1yiIadsfpQXjfZCHhUCzbfmeurdNz6bDRsBWRsB+k0cXxdHjpa0wkTBn3hKnjzRZyEgYk3IeEv2RKWCt1cN9EJ0zjfm7Mq/rAVgUnbLpwnK/zA2tnuQmzJHquuqJq91blJuwmAW8rHbV3q2ITFrOAt7Xz3l2UmrBMlpcHe9fOUhOqRYVhFO/cqtSEy0H6bh/tJ1uhCctqlTB/NSnG9pOt1ISXjxLq825laVFowo9GaRPrF9talJqw3n6macaZ09yi1ISG2cLyriwePwxzi1ITru4s2naxma59TC2KTRjE83FqmQ6yeDaUDS3KTRhMV96h5TTSLD4HQ4uCE9bxePUU5pYL/3mD5o9CcMKgTONc39NNLrV5iK4aNLUoOWHQ38RQtW3nsm6db92i8ISvGBtct+hvwqyzBFxE9DehrcHlQPU1YWNvcNGirwlfNThv0ZOE9eJG1OsGZy36kVBdczU9e7RvAz5b9CFhqfIwSp4XwG+OwUWLPiRUV/33Z4tbGtTvGK635CfUDfb/SO5rt20N9t8m65fLT9g3GD5abDY2qC+lvEg4NjhEvLW4tUFvEj4a7OXq3TzoW8Jpg0PEzfk8SThv8EMeJFw1+O8SHmrQg4QHG/Qg4cEGxSc83KD4hIcblJ6w3L508TXh+vtDEpLw3GwDEpKQhOdznVD2fRr9tdpRw/1HqQndIeEvkXCXUlDC+1NBndsnge/fwyVnp9PGH3p95dm1WMKza4/fI37j+UPXR/c+2X9/hjQI0uO3LsyuMioM9A8Sjy/W1iIhY7Sn2tzpUahdWyXiNDNSxcWtSlCBAAAAAAAAAAAAAAAAAAAAAAAAAAAAwCn+AEXGNosxDBhFAAAAAElFTkSuQmCC"
                }}
                style={{
                  width: screenWidth * 0.96,
                  height: screenWidth * 0.7,
                  marginBottom: 50,
                  marginTop: 20,
                  resizeMode: "contain"
                }}
              />
            )}
          </View>

          {/* <TouchableOpacity
            onPress={() => this.pickSingleWithCamera(false)}
            style={styles.button}
          > */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20
            }}
          >
            <Icon
              name="camera"
              size={50}
              color={"black"}
              onPress={() => this.pickSingleWithCamera(false)}
            />
            <Icon
              name="photo"
              size={50}
              color={"black"}
              onPress={() => this.pickSingle(false)}
            />
            <Icon
              name="crop"
              size={50}
              color={"black"}
              onPress={() => this.cropLast()}
            />
          </View>
          <View style={{ marginTop: 70 }}>
            <TouchableOpacity
              onPress={() => {
                if (image) {
                  this.props.navigation.navigate("second",{image})
                } else {
                  alert("Upload Image First to Edit!");
                }
              }}
              style={{
                width: screenWidth * 0.9,
                height: 40,
                backgroundColor: "#eee",
                elevation: 1,
                borderRadius: 20,
                justifyContent: "center",
                alignItem: "center",
                left: screenWidth * 0.035
              }}
            >
              <Text style={styles.text}>Edit Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#989"
  },
  button: {
    backgroundColor: "blue",
    marginBottom: 10
  },
  text: {
    color: "#555",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
});









// export const DemoScreen: React.FunctionComponent<DemoScreenProps> = props => {
//   const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])
//   console.warn()
//   return (
//     <View style={FULL}>
//       <Wallpaper />
//       <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
//         <Header
//           headerTx="demoScreen.title"
//           leftIcon="back"
//           onLeftPress={goBack}
//           style={HEADER}
//           titleStyle={HEADER_TITLE}
//         />
//       <Image source={image} style={IMAGE} />
//       </Screen>
//     </View>
//   )
// }
