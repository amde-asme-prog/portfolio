const { SkillsModel } = require("../models/skillsModel");

// Get All Skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await SkillsModel.findAll();
    res.status(200).json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ error: "Error fetching skills" });
  }
};

// Add a New Skill
exports.addSkill = async (req, res) => {
  try {
    const skill = await SkillsModel.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    console.error("Error adding skill:", error);
    res.status(500).json({ error: "Error adding skill" });
  }
};

// Update an Existing Skill
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSkill = await SkillsModel.update(req.body, {
      where: { id },
      returning: true,
    });

    if (updatedSkill[0] === 0) {
      return res.status(404).json({ error: "Skill not found" });
    }

    res.status(200).json(updatedSkill[1][0]);
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({ error: "Error updating skill" });
  }
};

// Delete a Skill
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SkillsModel.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Skill not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ error: "Error deleting skill" });
  }
};
