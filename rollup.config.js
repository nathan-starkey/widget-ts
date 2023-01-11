export default {
  input: "dist/WidgetTS.js",
  output: [
    {
      file: "dist/widget-ts.bundle.js",
      format: "iife",
      name: "WidgetTS"
    }
  ]
};