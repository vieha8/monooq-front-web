module.exports = {
  plugins: [
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './src/**/*.{js,jsx,ts,tsx,css}',
          './src/**/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      },
    ],
  ],
};
