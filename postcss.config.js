import purgecss from '@fullhuman/postcss-purgecss';

export default {
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
