import Package from '../models/Package.js';

export const createPackage = async (req, res) => {
  try {
    const { name, description, price, features } = req.body;
    const newPackage = new Package({ name, description, price, features });
    await newPackage.save();
    res.status(201).json({ message: 'Package created', package: newPackage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.status(200).json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const updated = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Package not found' });
    res.status(200).json({ message: 'Package updated', package: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Package not found' });
    res.status(200).json({ message: 'Package deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

