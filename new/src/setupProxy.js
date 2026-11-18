const express = require("express")
const contact = require("../../api/contact")
const cohortApplication = require("../../api/cohort-application")

module.exports = (app) => {
  app.use("/api/contact", express.json(), contact)
  app.use("/api/cohort-application", express.json(), cohortApplication)
}
