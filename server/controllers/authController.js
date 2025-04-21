import User from '../models/User.js';
import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { genrateToken } from '../utils/functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SECRET = process.env.JWT_SECRET || "supersecret";


export async function register(req, res) {
  const { username, password,email } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ msg: "Email already exists" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(409).json({ msg: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email,username, password: hashed });
    await user.save();

    // Create user folder
    const userPath = path.join(__dirname, '..', 'user', username);
    try {
      await fs.access(userPath);
    } catch {
      await fs.mkdir(userPath);
    }

    res.status(201).json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ msg: "Invalid credentials" });

    const token = genrateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
