const xss = require("xss");
const Blog = require("../../model/blog");
const paginate = require("express-paginate");
const Comment = require("../../model/comment");

//Create new blog
const createBlog = async (req, res) => {
  try {
    const { title, body } = req.body;

    // Sanitize user input to prevent XSS attacks
    const sanitizedTitle = xss(title);
    const sanitizedBody = xss(body);

    // Create a new post using sanitized input
    const newBlog = new Post({
      title: sanitizedTitle,
      body: sanitizedBody,
      createdBy: req.user._id,
    });
    //Save new blog
    await newBlog.save();
    return res.status(200).json({
      message: "Blog is successfully created",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

//Update the blog
const updateBlog = async (req, res) => {
  try {
    //Look for the Id of the blog from the database
    const blog = await Blog.findById(req.params.id);
    if (blog.email === req.body.email) {
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
    // Find all the blogs with the title and category
    const [results, itemCount] = await Promise.all([
      Blog.find({})
        .populate("category", "title")
        .sort({ createdAt: -1 })
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Story.count({}),
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
    }).populate("category", "title");
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
      .populate("category", "title")
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
    //Get the Id of the blog from the database and delete it
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (deletedBlog.email === req.body.email) {
      try {
        await deletedBlog.delete();
        res.status(200).json({
          message: "Blog has been deleted...",
          success: true,
        });
      } catch (err) {
        res.status(500).json({
          message: "Item not found",
          success: false,
        });
      }
    } else {
      res.status(401).json({
        message: "You can delete only your blog!",
        success: true,
      });
    }
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
