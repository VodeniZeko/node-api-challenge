const express = require("express");
const router = express.Router();
const actionDB = require("../data/helpers/actionModel");
const projectDB = require("../data/helpers/projectModel");

const validateActionId = async (req, res, next) => {
  try {
    let action = await actionDB.get(req.params.actionID);
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(400).json({ error: "No action with that id." });
    }
  } catch (err) {
    console.error(err);
  }
};
router.get("/:actionID", validateActionId, async (req, res) => {
  try {
    res.status(200).json(req.action);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "The action could not be retrieved." });
  }
});

router.post("/", async (req, res) => {
  try {
    let project = await projectDB.get(req.body.project_id);
    if (project) {
      let action = await actionDB.insert(req.body);
      res.status(201).json(action);
    } else {
      res
        .status(400)
        .json({ error: "Couldn't find a project of specified project_id." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "The action could not be posted." });
  }
});

router.delete("/:actionID", validateActionId, async (req, res) => {
  try {
    let action = await actionDB.remove(req.params.actionID);
    res.status(200).json(action);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "The action could not be deleted." });
  }
});

router.put("/:actionID", validateActionId, async (req, res) => {
  try {
    let action = await actionDB.update(req.params.actionID, req.body);
    res.status(201).json(action);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "The action could not be updated." });
  }
});

module.exports = router;
