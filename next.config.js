module.exports = {
  async rewrites() {
    return [
      {
        source: "/wp-content/:splat*",
        destination: "http://d18l99bmg6trdn.cloudfront.net/wp-content/:splat*",
      },
    ];
  },
};
