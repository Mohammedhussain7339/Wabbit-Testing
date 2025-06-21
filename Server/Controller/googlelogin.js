import User from '../Schema/GoogleLoginSchema.js'
const googleLogin = async (req, res) => {
  const { name, email, googleId, image } = req.body;

  try {
    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ name, email, googleId, image });
      await user.save();
    }

    res.status(200).json({ message: "User saved", user });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { googleLogin };
