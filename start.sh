pm2 delete "Car Sales Backend"
NODE_ENV=production PORT=5401 pm2 start server.js --name "Car Sales Backend"
