import "./configs/dotenv/config.js"
import "./configs/cloudinary/config.js"

// Global Exception Handler
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...")
  console.error(err.name, err.message)
  if (process.env.NODE_ENV === "production") process.exit(1)
})

import app from "./app.js"
import mongoose from "mongoose"

// Database Init
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!")

    // Server Init
    const port = process.env.PORT || 3000
    const server = app.listen(port, () => console.log(`App running on port ${port}...`))

    // Global Promise Rejection Handler
    process.on("unhandledRejection", (err) => {
      console.error("UNHANDLED REJECTION! Shutting down...")
      console.error(err.name, err.message)
      server.close(() => process.env.NODE_ENV === "production" && process.exit(1))
    })

    // SIGTERM Handler
    process.on("SIGTERM", () => {
      console.error("SIGTERM RECEIVED! Shutting down gracefully")
      server.close(() => console.log("Process terminated!"))
    })
  })
  .catch((err) => {
    console.error("Error in Database Connection!")
    console.error(err.name, err.message)
  })
