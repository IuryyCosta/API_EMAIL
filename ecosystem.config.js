module.exports = {
    apps : [{
      name: "API_ENVIO_EMAIL",
      script: "./build/server.js",
      instances: "1",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }