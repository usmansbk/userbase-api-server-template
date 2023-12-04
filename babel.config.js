module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "^@/(.+)": "./src/\\1",
          "^test/(.+)": "./test/\\1",
          "^locales/(.+)": "./locales/\\1",
          "^emails/(.+)": "./emails/\\1",
        },
      },
    ],
  ],
};
