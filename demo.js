import React, { PureComponent } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Slider from "@react-native-community/slider";
import { ImageFilter } from "react-native-image-filter-kit";
// import FastImage from "react-native-fast-image";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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
        {
          type: "RGBA",
          max: 0,
          min: 0,
          step: 1
        },
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
        // {
        //   type: "HueRotate",
        //   max: 0,
        //   min: 0,
        //   step: 1
        // },

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
        },

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
        {
          type: "Threshold",
          max: 20,
          min: 0,
          step: 2
        },
        {
          type: "Tint",
          max: 1,
          min: -1,
          step: 0.1
        }
      ]
    };
  }

  render() {
    // console.warn(this.timer || "Nihihi")
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
      angle
    } = this.state;
    const uri = "./parrot.png";
    return (
      <ScrollView style={{ flex: 1 }}>
        <View
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
        </View>

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
                      source={require(uri)}
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
            paddingBottom: 150
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
                    val: 0
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
                            source={require(uri)}
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
      </ScrollView>
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
