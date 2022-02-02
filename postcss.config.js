const postcss = require("postcss")

module.exports = () => ({
  plugins: [
    // This plugin runs postcss against a root internally
    // Marking the whole tree as clean
    Object.assign(function () {
      return {
        postcssPlugin: "test",
        Once(root, { result }) {
          let somePlugin = Object.assign(function () {
            return {
              postcssPlugin: "some-plugin",
              Rule(rule) {
                console.log("1. This `Rule` visitor from a nested plugin does run")
              }
            }
          }, { postcss: true })

          postcss([somePlugin]).process(root, result.opts).sync()

          // Uncomment these two lines and the visitors will work again
          // const LazyResult = require("postcss/lib/lazy-result")
          // new LazyResult(result.processor, root, result.opts)
        }
      }
    }, { postcss: true }),

    // Which means that this plugin never runs anything other than Once/OnceExit
    Object.assign(function () {
      return {
        postcssPlugin: "test",
        Once() {
          console.log("2. This `Once` visitor from a later plugin runs")
        },
        Rule() {
          console.log("3. But you will not see this `Rule` visitor run")
        }
      }
    }, { postcss: true}),
  ],
})
