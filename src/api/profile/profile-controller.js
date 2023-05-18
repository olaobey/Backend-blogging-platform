const User = require("../../model/user");

const updateOne = async (req, res) => {
  try {
    const profile = await User.findById(req.user._id);

    if (profile.email === req.body.email) {
      try {
        const updatedProfile = await Post.findByIdAndUpdate(
          req.user._id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({
          updatedProfile: updatedProfile,
          message: "Item successfully updated",
          success: true,
        });
      } catch (err) {
        res.status(500).json({ message: err.message, success: false });
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

const getOne = async (req, res) => {
  try {
    const item = await User.findById(req.user._id).select("-password");
    if (item) {
      return res.status(200).json(item);
    }
    return res.status(404).json({
      message: "Item not found",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

module.exports = {
  updateOne,
  getOne,
};
