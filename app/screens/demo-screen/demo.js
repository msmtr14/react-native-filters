import React, { PureComponent } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  NativeModules,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import { ImageFilter } from "react-native-image-filter-kit";
// import FastImage from "react-native-fast-image";
var ImagePicker = NativeModules.ImageCropPicker;
const screenWidth = Dimensions.get("window").width;
export default class Filters extends PureComponent {
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
      data: [
        {
          type: "Invert",
          max: 0,
          min: 0,
          step: 1
        },
        // {
        //   type: "RGBA",
        //   max: 0,
        //   min: 0,
        //   step: 1
        // },
        {
          type: "Brightness",
          max: 10,
          min: 0,
          step: 1
        },
        {
          type: "Browni",
          max: 0,
          min: 0,
          step: 1
        },

        {
          type: "Contrast",
          max: 10,
          min: -10,
          step: 1
        },
        {
          type: "Cool",
          max: 0,
          min: 0,
          step: 1
        },

        {
          type: "Grayscale",
          max: 1,
          min: 0,
          step: 0.1
        },
        {
          type: "HueRotate",
          max: 0,
          min: 0,
          step: 1
        },

        {
          type: "Kodachrome",
          max: 0,
          min: 0,
          step: 1
        },

        {
          type: "Lsd",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "LuminanceToAlpha",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Night",
          max: 1,
          min: 0,
          step: 0.1
        },
        {
          type: "Nightvision",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Normal",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Temperature",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Threshold",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Tint",
          max: 0,
          min: 0,
          step: 1
        },

        {
          type: "ToBGR",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Vintage",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Warm",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Achromatomaly",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Achromatopsia",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Deuteranomaly",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Deuteranopia",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Protanomaly",
          max: 0,
          min: 0,
          step: 1
        }
,
        {
          type: "Protanopia",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Tritanomaly",
          max: 0,
          min: 0,
          step: 1
        },
        {
          type: "Tritanopia",
          max: 0,
          min: 0,
          step: 1
        },

        {
          type: "Sepia",
          max: 1,
          min: 0,
          step: 0.1
        },
        {
          type: "Temperature",
          max: 10,
          min: -10,
          step: 1
        },
        // {
        //   type: "Threshold",
        //   max: 20,
        //   min: 0,
        //   step: 2
        // },
        // {
        //   type: "Tint",
        //   max: 1,
        //   min: -1,
        //   step: 0.1
        // }
      ]
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
    const uri = "./parrot.png";
    return edit ? (
      <ScrollView style={{ flex: 1 }}>
        {/* <View
          style={{
            flex: 1,
            marginTop: 40,
            justifyContent: "center",
            alignItem: "center",
            width: "100%"
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              marginLeft: width * 0.04,
              marginBottom: 5,
              color: "black"
            }}
          >
            Angle
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: width * 0.6,
              marginLeft: width * 0.2
            }}
          >
            <Text>0</Text>
            <Slider
              maximumTrackTintColor={"green"}
              minimumTrackTintColor={"blue"}
              maximumValue={180}
              minimumValue={0}
              onValueChange={val =>
                setTimeout(() => {
                  this.setState({ angle: val });
                }, 250)
              }
              step={10}
              style={{
                color: "red",
                width: width * 0.8,
                // marginLeft: width * 0.1,
                marginBottom: 30
              }}
            />
            <Text>180</Text>
          </View>

          {type !== "RGBA" ? (
            (max !== 0 || min !== 0) &&
            type !== "Invert" && (
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginLeft: width * 0.04,
                    marginBottom: 5,
                    color: "black"
                  }}
                >
                  Amount
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    width: width * 0.6,
                    marginLeft: width * 0.2
                  }}
                >
                  <Text>{min}</Text>
                  <Slider
                    maximumTrackTintColor={"green"}
                    minimumTrackTintColor={"red"}
                    maximumValue={max}
                    minimumValue={min}
                    onValueChange={val => this.setState({ val })}
                    step={step}
                    style={{
                      color: "red",
                      width: width * 0.8,
                      // marginLeft: width * 0.1,
                      marginBottom: 30
                    }}
                  />
                  <Text>{max}</Text>
                </View>
              </View>
            )
          ) : (
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  marginLeft: width * 0.04,
                  marginBottom: 5,
                  color: "red"
                }}
              >
                Red
              </Text>
              <Slider
                // maximumTrackTintColor={"green"}
                minimumTrackTintColor={"red"}
                maximumValue={255}
                minimumValue={0}
                onValueChange={val => this.setState({ alpha: val })}
                step={rgba}
                style={{
                  color: "red",
                  width: width * 0.96,
                  marginLeft: width * 0.04,
                  marginBottom: 30
                }}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  marginLeft: width * 0.04,
                  marginBottom: 5,
                  color: "green"
                }}
              >
                Green
              </Text>
              <Slider
                // maximumTrackTintColor={"green"}
                minimumTrackTintColor={"green"}
                maximumValue={255}
                minimumValue={0}
                onValueChange={val => this.setState({ alpha: val })}
                step={rgba}
                style={{
                  color: "red",
                  width: width * 0.96,
                  marginLeft: width * 0.04,
                  marginBottom: 30
                }}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  marginLeft: width * 0.04,
                  marginBottom: 5,
                  color: "blue"
                }}
              >
                Blue
              </Text>
              <Slider
                // maximumTrackTintColor={"green"}
                minimumTrackTintColor={"blue"}
                maximumValue={255}
                minimumValue={0}
                onValueChange={val => this.setState({ blue: val })}
                step={rgba}
                style={{
                  color: "red",
                  width: width * 0.96,
                  marginLeft: width * 0.04,
                  marginBottom: 30
                }}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  marginLeft: width * 0.04,
                  marginBottom: 5,
                  color: "black"
                }}
              >
                Alpha
              </Text>
              <Slider
                // maximumTrackTintColor={"green"}
                minimumTrackTintColor={"black"}
                maximumValue={255}
                minimumValue={0}
                onValueChange={val => this.setState({ alpha: val })}
                step={rgba}
                style={{
                  color: "red",
                  width: width * 0.96,
                  marginLeft: width * 0.04,
                  marginBottom: 30
                }}
              />
            </View>
          )}
        </View> */}

        <View
          style={{
            marginTop: 10,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              marginLeft: width * 0.04,
              marginBottom: 5,
              color: "red"
            }}
          ></Text>
          <ImageFilter
            config={{
              // disableCache: true,
              name: "Earlybird",
              image: {
                name: "SoftLightBlend",
                resizeCanvasTo: "dstImage",
                dstTransform: {
                  scale: "CONTAIN",
                  rotate: `${angle}deg`
                  // offset: {
                  //   x: 30,
                  //   y: 40
                  // }
                },

                dstImage: {
                  name: "Emboss",

                  image: (
                    <Image
                      style={{ width: width * 0.96, height: width * 0.96 }}
                      source={image || require(uri)}
                      resizeMode={"contain"}
                    />
                    // <FastImage
                    //   style={{ width: width * 0.96, height: width * 0.96 }}
                    //   source={{
                    //     uri,
                    //     // headers: { Authorization: "someAuthToken" },
                    //     // priority: FastImage.priority.high
                    //   }}
                    //   // resizeMode={FastImage.resizeMode.contain}
                    // />
                  )
                },
                srcTransform: {
                  anchor: { x: 0.5, y: 1 },
                  translate: { x: 0.5, y: 1 }
                },
                srcImage: {
                  name: type,
                  image: {
                    name: "RadialGradient",
                    colors: ["rgba(0, 0, 255, 1)", "#00ff00", "green"],
                    stops: [0.25, 0.75, 1],
                    center: { x: "50w", y: "100h" }
                  },
                  amount: val,
                  red,
                  green,
                  blue,
                  alpha
                  //   desaturation: val
                }
              }
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // flexWrap: "wrap",
            flexDirection: "row",
            paddingBottom: 20
          }}
        >
          <ScrollView style={{ flex: 1 }} horizontal>
            {data.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  this.setState({
                    type: item.type,
                    max: item.max,
                    min: item.min,
                    step: item.step,
                    val: 0,
                    angle: 0
                  })
                }
                style={{
                  marginTop: 25,
                  marginLeft: 10,
                  //   backgroundColor: "#eee",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ fontWeight: "500" }}>{item.type}</Text>
                <ImageFilter
                  config={{
                    // disableCache: true,
                    disableCache: true,
                    name: "Earlybird",
                    image: {
                      name: "SoftLightBlend",
                      resizeCanvasTo: "dstImage",
                      dstTransform: {
                        scale: "CONTAIN"
                      },

                      dstImage: {
                        name: "Emboss",

                        image: (
                          <Image
                            style={{ width: 100, height: 100 }}
                            source={image || require(uri)}
                            resizeMode={"contain"}
                          />
                        )
                      },
                      srcTransform: {
                        anchor: { x: 0.5, y: 1 },
                        translate: { x: 0.5, y: 1 }
                      },
                      srcImage: {
                        name: item.type,
                        image: {
                          name: "RadialGradient",
                          colors: ["rgba(0, 0, 255, 1)", "#00ff00", "green"],
                          stops: [0.25, 0.75, 1],
                          center: { x: "50w", y: "100h" }
                        }

                        //   desaturation: val
                      }
                    }
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ edit: false, image: null });
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
            <Text style={styles.text}>Upload Image</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    ) : (
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
                  this.setState({ edit: true });
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

// [
//     "Invert",
//     "Brightness",
//     "Browni",

//     "Contrast",
//     "Cool",

//     "Grayscale",

//     "HueRotate",

//     "Kodachrome",
//     "Lsd",
//     "LuminanceToAlpha",
//     "Night",
//     "Nightvision",
//     "Normal",

//     "Temperature",
//     "Threshold",
//     "Tint",
//     "ToBGR",
//     "Vintage",
//     "Warm",

//     "Achromatomaly",
//     "Achromatopsia",
//     "Deuteranomaly",
//     "Deuteranopia",
//     "Protanomaly",
//     "Protanopia",

//     "Tritanomaly",
//     "Tritanopia"
//   ]

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
