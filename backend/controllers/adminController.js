const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        var passwordMatched = null;
        
        if(admin){
            passwordMatched = await bcrypt.compare(password, admin.password);
        }
        
        if (!admin || !passwordMatched) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.session.admin = admin._id;
        req.session.adminUsername = username; // Make sure this is set
        
        res.json({ 
            message: 'Login successful',
            username: username
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};

const logoutAdmin = (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'Logged out' });
    });
};

const getCurrentAdmin = async (req, res) => {
    if (!req.session.admin || !req.session.adminUsername) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json({ username: req.session.adminUsername });
};

module.exports = { loginAdmin, logoutAdmin, getCurrentAdmin };
