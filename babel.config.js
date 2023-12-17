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
          "^assets/(.+)": "./assets/\\1",
          "^types/(.+)": "./types/\\1",
        },
      },
    ],
  ],
};
