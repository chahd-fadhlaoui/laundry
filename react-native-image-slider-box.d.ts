declare module "react-native-image-slider-box" {
    import React from "react";
    import { ImageStyle, StyleProp, ViewStyle } from "react-native";
  
    export interface SliderBoxProps {
      images: (string | number)[];
      dotColor?: string;
      inactiveDotColor?: string;
      autoPlay?: boolean;
      circleLoop?: boolean;
      sliderBoxHeight?: number;
      parentWidth?: number;
      ImageComponentStyle?: StyleProp<ImageStyle>;
      resizeMethod?: "auto" | "resize" | "scale";
      resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
    }
  
    export class SliderBox extends React.Component<SliderBoxProps, any> {}
  }
  