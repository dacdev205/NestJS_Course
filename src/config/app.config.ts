export default () => ({
  app: {
    name: process.env.APP_NAME || 'NestJS Application',
    port: parseInt(process.env.APP_PORT, 10) || 3000,
  },
});
