const winston = require("winston");
require("dotenv").config();

// Logger configuration
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Add console transport in development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Configuration object
const config = {
  // Server configuration
  port: process.env.PORT || 3030,

  // MongoDB configuration
  mongoURI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/customer-management",

  // JWT configuration (if needed later)
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",

  // Logger instance
  logger: logger,

  // CORS configuration
  corsOptions: {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:4200", // Angular dev server
        "http://localhost:3000", // Production build
        "http://localhost:3030", // API server
        "http://localhost:8080", // Alternative port
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 600, // Cache preflight requests for 10 minutes
  },
};

module.exports = config;
