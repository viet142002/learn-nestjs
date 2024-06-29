export default () => ({
    port: parseInt(process.env.PORT, 10) || 8000,
    database: process.env.DATABASE_URI,
    jwtSecret: process.env.SECRET_JWT,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
});
