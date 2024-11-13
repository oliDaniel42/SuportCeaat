const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

// Obter a configuração padrão do Metro para Expo
const config = getDefaultConfig(__dirname);

// Integrar a configuração do NativeWind
const nativeWindConfig = withNativeWind(config, { input: "./global.css" });

// Integrar a configuração do Reanimated
module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);
