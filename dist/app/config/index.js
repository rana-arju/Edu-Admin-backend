"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
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
    cloudinary_api: process.env.CLOUDINARY_API_KEY,
    cloudinary_cloude_name: process.env.CLOUDINARY_cLOUDE_NAME,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
};
