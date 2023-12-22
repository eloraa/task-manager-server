const path = require("path");

// import .env variables
require("dotenv-safe").config({
    path: path.join(__dirname, "../.env"),
    sample: path.join(__dirname, "../.env.example"),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    allowedHost: process.env.ALLOWED_HOST,
    roles: ["admin", "moderator", "normal"],
    mongo: {
        uri:
            process.env.NODE_ENV === "test"
                ? process.env.MONGO_URI_TESTS
                : process.env.MONGO_URI,
    },
    logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
    favicon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"> <style> path { fill: black; } @media (prefers-color-scheme: dark) { path { fill: white; } } </style> <path fill-rule="evenodd" clip-rule="evenodd" d="M34.1346 12.75V34.1346V36.4808H12.75V12.75H34.1346ZM34.1346 40.4808H12.75H8.75V36.4808V12.75V8.75H12.75H34.1346H36.4808H38.1346H40.4808H59.5192H61.8654H63.5192H65.8654H87.25H91.25V12.75V36.4808V40.4808H87.25H65.8654V59.5192V61.8654V63.5192V65.8654V87.25V91.25H61.8654H38.1346H34.1346V87.25V65.8654V63.5192V61.8654V59.5192V40.4808ZM61.8654 40.4808H59.5192H40.4808H38.1346V59.5192H61.8654V40.4808ZM59.5192 12.75H40.4808V34.1346H59.5192V12.75ZM65.8654 36.4808H87.25V12.75H65.8654V34.1346V36.4808ZM61.8654 65.8654H38.1346V87.25H61.8654V65.8654Z" fill="black"/> </svg>',
};
