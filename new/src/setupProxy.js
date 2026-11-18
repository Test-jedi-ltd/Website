const express = require("express")
const contact = require("../../api/contact")

module.exports = (app) => {
  app.use("/api/contact", express.json(), contact)
}
