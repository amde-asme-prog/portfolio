const ServicesModel = require("../models/servicesModel");

// Get All Services
exports.getServices = async (req, res) => {
  try {
    const services = await ServicesModel.findAll();
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Error fetching services" });
  }
};

// Add a New Service
exports.addService = async (req, res) => {
  try {
    const service = await ServicesModel.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ error: "Error adding service" });
  }
};

// Update an Existing Service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await ServicesModel.update(req.body, {
      where: { id },
      returning: true,
    });

    if (updatedService[0] === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json(updatedService[1][0]);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Error updating service" });
  }
};

// Delete a Service
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ServicesModel.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Error deleting service" });
  }
};
