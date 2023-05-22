const User = require("../../model/user");
const Blog = require("../../model/blog");
const bcrypt = require("bcrypt");

//UPDATE PROFILE
const updateUser = async (req, res) => {
  try {
    if (!req?.body?.id) {
      return res.status(400).json({
        message: "ID parameter is required.",
        success: false,
      });
    }

    // Does the user exist to update?
    const user = await User.findById({ _id: req.body.id }).exec();
    console.log("logging user", user);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // Check for duplicate
    const userName = await User.findOne({ username: req.body.username })
      .lean()
      .exec();

    // Allow updates to the original user
    if (userName && userName === req.body.username) {
      return res.status(409).json({
        message: "Duplicate username",
        success: false,
      });
    }

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      return res.status(200).json({
        user: user,
        success: true,
      });
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

const deleteUser = async (req, res) => {
  try {
    if (!req?.body?.id)
      return res.status(400).json({ message: "User ID required" });

    // Confirm data
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
      res.status(204).json({ message: `User ID ${req.body.id} not found` });
    }

    // Does the user still have written blog?
    const blog = await Blog.findOne({ _id: req.body.id }).lean().exec();
    if (blog) {
      return res.status(400).json({
        message: "User has written blog",
        success: false,
      });
    }
    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json({
      reply: reply,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

module.exports = {
  updateUser,
  getUserById,
  deleteUser,
};
