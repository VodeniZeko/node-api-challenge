const express = require("express");
const router = express.Router();
const projectDB = require("../data/helpers/projectModel");

const validateProjectId = async (req, res, next) => {
  try {
    let project = await projectDB.get(req.params.projectID);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(400).json({ error: "No project with that id." });
    }
  } catch (err) {
    console.error(err);
  }
};
router.get("/:projectID", validateProjectId, async (req, res) => {
  try {
    res.status(200).json(req.project);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "The project information could not be retrieved." });
  }
});

router.post("/", async (req, res) => {
  try {
    let project = await projectDB.insert(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "The project could not be posted." });
  }
});

router.delete("/:projectID", validateProjectId, async (req, res) => {
  try {
    await projectDB.remove(req.params.projectID);
    res.status(200).json(req.project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "The project could not be deleted." });
  }
});

router.put("/:projectID", validateProjectId, async (req, res) => {
  try {
    let project = await projectDB.update(req.params.projectID, req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "The project could not be updated." });
  }
});

module.exports = router;
