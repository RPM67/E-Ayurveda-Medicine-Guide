const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

const loginAdmin = async (req, res) => {
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
    res.json({ message: 'Login successful' });
};

const logoutAdmin = (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'Logged out' });
    });
};

module.exports = { loginAdmin, logoutAdmin };
