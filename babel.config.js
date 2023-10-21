module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      [
        "module-resolver",
        {
          root: ["./"], // Set the root directory of your app
          alias: {
            "@": "./", // Create an alias for the root directory
          },
        },
      ],
    ],
  };
};
