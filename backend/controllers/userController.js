// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//middleware to verify jwt token


const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header (format: Bearer <token>)
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token

  // If no token is provided
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key stored in the environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object (e.g., userId)
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }
};


//login user

const loginUser = async (req,res)=>{
  const {email,password} = req.body;
  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({message:'Incorrect password'});
    }

    const token =jwt.sign({userId: user._id},process.env.JWT_SECRET,{
      expiresIn:'1m'
    });

    res.status(200).json({
      message:'Login successful',
      token,
      user:{
        email:user.email,
        firstName:user.first_name,
        lastName:user.last_name,
      },
    });
  }catch(error){
    console.log(error);
    res.status(500).json({messgae:'Server error'});
  }
};


//adding user

const addUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password,10);


  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const createdDate = new Date().toISOString();
    const updatedDate = new Date().toISOString();

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      createdDate,
      updatedDate,
    });

    await newUser.save();
    return res.status(200).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (err) {
    console.error('Error during user creation:', err);
    return res.status(500).json({ error: err });
  }
};

// const getUser = async (req,res)=>{
//   const {userId} = req.params;

//   try{
//     const user = await User.findById(userId);
//     if(!user){
//       return res.status(404).json({message:'User not found'});
//     }

//     res.status(200).json({
//       message:'User found',
//       user:{
//         email:user.email,
//         firstName:user.first_name,
//         lastName:user.last_name,
//         createdDate:user.createdDate,
//         updatedDate:user.updatedDate
//       },
//     });
//   }catch(error){
//     console.log('Error fetching user:',error);
//     res.status(500).json({message: 'Server error'});
//   }
// };
const getSignupUserDetails = async(req,res)=>{
  try{
    const users = await User.find()
    return res.status(200).json({message:'got users',users:users}); 
  }
  catch(error){
    console.log('Error fetching the users');
    res.status(500).json({message:'Server error'})
  }
};
module.exports = { addUser,loginUser,getSignupUserDetails,verifyToken};
