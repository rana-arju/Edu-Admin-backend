import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  node_env: process.env.NODE_ENV,
  token: process.env.JWT_ACCESS_TOKEN,
  refresh: process.env.REFRESH_TOKEN,
  refresh_time: process.env.REFRESH_ACCESS_EXPIRES,
  token_time: process.env.JWT_ACCESS_EXPIRES,
  reset_pass_url: process.env.RESET_LIVE_URL,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASSWORD,
};
