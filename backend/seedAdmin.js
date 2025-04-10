const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/admin"); // adjust path if needed
require("dotenv").config();

const admins = [
  { username: "rahul", password: "1234" },
  { username: "kunal", password: "1234" },
  { username: "ritam", password: "1234" },
  { username: "ram", password: "1234" },
  { username: "lokesh", password: "1234" }
];

const seedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (let admin of admins) {
      const exists = await Admin.findOne({ username: admin.username });
      if (!exists) {
        const hashed = await bcrypt.hash(admin.password, 10);
        await Admin.create({ ...admin, password: hashed });
        console.log(`✅ Added admin: ${admin.username}`);
      } else {
        console.log(`⚠️ Admin already exists: ${admin.username}`);
      }
    }

    await mongoose.disconnect();
    console.log("🌱 Seeding complete");
  } catch (err) {
    console.error("❌ Error seeding admins:", err);
  }
};

seedAdmins();
