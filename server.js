const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (for demo)
let users = [];
let blogs = [];

// --- ROUTES ---

// Home Route
app.get('/', (req, res) => {
  res.json({ message: "Blog App Backend is Running! - Module 2" });
});

// 1. User Registration API
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);
  
  res.status(201).json({ message: "User Registered Successfully", user: newUser });
});

// 2. User Login API
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  res.json({ message: "Login Successful", user: { id: user.id, username: user.username, email: user.email } });
});

// 3. Create Blog API
app.post('/api/blogs/create', (req, res) => {
  const { title, content, author } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ message: "Title and Content required" });
  }

  const newBlog = {
    id: blogs.length + 1,
    title,
    content,
    author: author || "Anonymous",
    createdAt: new Date()
  };
  
  blogs.push(newBlog);
  res.status(201).json({ message: "Blog Created Successfully", blog: newBlog });
});

// 4. Get All Blogs API
app.get('/api/blogs', (req, res) => {
  res.json(blogs);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
