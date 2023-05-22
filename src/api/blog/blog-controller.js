const Blog = require("../../model/blog");
const paginate = require("express-paginate");
const Comment = require("../../model/comment");

//Create new blog
const createBlog = async (req, res) => {
  try {
    const { title, body } = req.body;

    // Confirm data
    if (!body || !title) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    // Check for duplicate title
    const duplicate = await Blog.findOne({ title }).lean().exec();
    if (duplicate) {
      return res.status(409).json({
        message: "Duplicate blog title",
        success: false,
      });
    }
    // Create a new blog
    const newBlog = new Blog({
      ...req.body,
      createdBy: req.user._id,
    });
    console.log("Creating new blog ", newBlog);
    //Save new blog
    await newBlog.save();
    return res.status(200).json({
      data: newBlog,
      message: "Blog is successfully created",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

//Update the blog
const updateBlog = async (req, res) => {
  try {
    const { id, username, title } = req.body;
    // Confirm data
    if (!id || !username || !title) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    //Look for the Id of the blog from the database
    const blog = await Blog.findById(req.params.id).exec();
    if (!blog) {
      return res
        .status(400)
        .json({ message: "Blog not found", success: false });
    }

    // Check for duplicate title
    const duplicate = await Blog.findOne({ title }).lean().exec();

    // Allow renaming of the original note
    if (duplicate && duplicate?._id.toString() !== id) {
      res.status(409).json({
        message: "Duplicate blog title",
        success: false,
      });
    }
    if (blog.username === req.body.username) {
      try {
        //Update the blog with the specified Id from the database
        const updateBlog = await Blog.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({
          updateBlog: updateBlog,
          message: "Item successfully updated",
          success: true,
        });
      } catch (err) {
        res.status(500).json({
          message: "Server error",
          success: false,
        });
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

//Get all the blogs
const getAllBlogs = async (req, res) => {
  try {
    // Find all the paginated blogs with the title and category from MongoDB
    const [results, itemCount] = await Promise.all([
      Blog.find({})
        // .populate("category", "title")
        .sort({ createdAt: -1 })
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Blog.count({}),
    ]);

    //Get the pagination of blogs
    const pageCount = Math.ceil(itemCount / req.query.limit);
    return res.status(201).json({
      object: "list",
      has_more: paginate.hasNextPages(req)(pageCount),
      data: results,
      pageCount,
      itemCount,
      currentPage: req.query.page,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

//Get blog by Id
const getBlogById = async (req, res) => {
  try {
    //Get Id of the blog from the database and update
    const item = await Blog.findByIdAndUpdate(req.params.id, {
      $inc: { viewsCount: 1 },
    });
    if (item) {
      item.comments = await Comment.find({ blog: item._id });
      return res.status(200).json(item);
    }
    return res.status(404).json({
      message: "Item not found",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

//Get the top blog
const getTopBlog = async (req, res) => {
  try {
    //Get all the top blog with their title and category
    const result = await Blog.find({})
      // .populate("category", "title")
      .sort({ viewsCount: -1 })
      .limit(3)
      .lean()
      .exec();

    return res.status(201).json({
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Delete the blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.body;

    // Confirm data
    if (!id) {
      return res.status(400).json({
        message: "Blog ID required",
        success: false,
      });
    }

    // Confirm note exists to delete
    const blog = await Blog.findById(id).exec();

    if (!blog) {
      return res.status(400).json({ message: "Blog not found" });
    }

    const result = await blog.deleteOne();

    const data = `Blog '${result.title}' with ID ${result._id} deleted`;

    res.json({
      data,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

module.exports = {
  createBlog,
  deleteBlog,
  updateBlog,
  getAllBlogs,
  getBlogById,
  getTopBlog,
};
