const purgecss = require('@fullhuman/postcss-purgecss').default;

module.exports = {
  plugins: [
    purgecss({
      content: [
        './*.html',
        './src/**/*.{js,scss}',
        './public/**/*.svg',
      ],
      safelist: {
        deep: [
          /^collapsing/,
        ],
      },
    }),
  ],
};
