module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: process.env.NODE_ENV === 'test' ? 'commonjs' : false,
        loose: true,
        targets: {
          browsers: 'defaults',
        },
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
};
