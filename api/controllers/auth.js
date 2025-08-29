import bcrypt from "bcryptjs";
import User from "./../models/User.js";
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export const login = async (req,res) => {
  const { email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({message:"Please fill all"})
  }
    try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Hash password
    const iscorrectPassword = await bcrypt.compare(password,existingUser.password);
    if(!iscorrectPassword){
      return res.status(400).json({message:"invalid password"})
    }
    res.status(201).json({ message: `${existingUser.name} loggedin successfully`,data :existingUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }}