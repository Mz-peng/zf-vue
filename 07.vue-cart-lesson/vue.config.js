const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [],
      },
    },
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false,
    },
  },
});
