const { Router } = require("express");
const SelectedFields = require("../models/selectedFields.model");

const selectedFieldsRouter = Router();

// CREATE
selectedFieldsRouter.post("/create", async (req, res) => {
    try {
        const selectedFields = req.body;
        const newSelectedFields = await SelectedFields.create(selectedFields);
        res.status(201).json(newSelectedFields);
    } catch (error) {
        console.error("Error creating selected fields:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// READ ALL
selectedFieldsRouter.get("/findAll", async (req, res) => {
    try {
        const allSelectedFields = await SelectedFields.find();
        res.json(allSelectedFields);
    } catch (error) {
        console.error("Error finding all selected fields:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// READ BY ID
selectedFieldsRouter.get("/findById/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const selectedFields = await SelectedFields.findById(id);
        if (!selectedFields) {
            return res.status(404).json({ error: "Selected fields not found" });
        }
        res.json(selectedFields);
    } catch (error) {
        console.error("Error finding selected fields by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// READ LAST
selectedFieldsRouter.get("/findLast", async (req, res) => {
    try {
        const lastSelectedField = await SelectedFields.findOne().sort({ _id: -1 }).limit(1);
        res.json(lastSelectedField);
    } catch (error) {
        console.error("Error finding last selected field:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// UPDATE
selectedFieldsRouter.put("/updateById/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSelectedFields = await SelectedFields.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSelectedFields) {
            return res.status(404).json({ error: "Selected fields not found" });
        }
        res.json(updatedSelectedFields);
    } catch (error) {
        console.error("Error updating selected fields by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE
selectedFieldsRouter.delete("/deleteById/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSelectedFields = await SelectedFields.findByIdAndDelete(id);
        if (!deletedSelectedFields) {
            return res.status(404).json({ error: "Selected fields not found" });
        }
        res.json({ message: "Selected fields deleted successfully" });
    } catch (error) {
        console.error("Error deleting selected fields by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = selectedFieldsRouter;
