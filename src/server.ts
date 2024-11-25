import app from './app';
import config from './app/config';

import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Server is Running with port of ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
