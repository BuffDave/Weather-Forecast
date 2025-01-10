const purgecss = require('@fullhuman/postcss-purgecss').default;

module.exports = {
  plugins: [
    purgecss({
      content: [
        './*.html',              // Scan HTML files in the root directory
        './src/**/*.{js,scss}',  // Scan JS and SCSS files in the `src` folder
        './public/**/*.svg',     // Optional: Include public assets like SVGs if needed
      ],
    }),
  ],
};
