const Agent = require('../Models/Agent');
const bcrypt = require('bcrypt');

const addAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const existing = await Agent.findOne({ email });
    if (existing) return res.json({ success: false, message: 'Agent already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = new Agent({ name, email, mobile, password: hashedPassword });
    await newAgent.save();

    res.json({ success: true, message: 'Agent added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error adding agent' });
  }
};

const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json({ success: true, data: agents });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { addAgent, getAllAgents };
