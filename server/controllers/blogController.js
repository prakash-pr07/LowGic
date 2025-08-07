import Blog from "../models/Blog.js";

const mockBlogs = [
  {
    title: "Latest Supreme Court Verdict",
    content: "The Supreme Court ruled on...",
    source: "https://example.com/blog1"
  },
  {
    title: "Legal Rights Every Citizen Must Know",
    content: "Here's what every Indian citizen must know...",
    source: "https://example.com/blog2"
  }
];

// GET all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const shouldRefresh = blogs.length === 0 || (Date.now() - new Date(blogs[0].lastUpdated)) > 30 * 24 * 60 * 60 * 1000;

    if (shouldRefresh) {
      await Blog.deleteMany({});
      const updatedBlogs = await Blog.insertMany(mockBlogs.map(blog => ({
        ...blog,
        lastUpdated: new Date()
      })));

      return res.status(200).json({ success: true, blogs: updatedBlogs, refreshed: true });
    }

    res.status(200).json({ success: true, blogs, refreshed: false });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load blogs" });
  }
};

// Manual refresh
export const refreshBlogs = async (req, res) => {
  try {
    await Blog.deleteMany({});
    const newBlogs = await Blog.insertMany(mockBlogs.map(blog => ({
      ...blog,
      lastUpdated: new Date()
    })));

    res.status(200).json({ success: true, blogs: newBlogs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Manual refresh failed" });
  }
};
