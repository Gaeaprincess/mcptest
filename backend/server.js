const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Mock Data
const users = [
    { username: 'admin', password: '123', token: 'mock_token_admin_123' },
    { username: 'user', password: '123', token: 'mock_token_user_123' }
];

const products = [
    { id: 1, name: 'iPhone 15', price: 5999, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'MacBook Pro', price: 12999, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'AirPods Pro', price: 1899, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'iPad Air', price: 4799, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Apple Watch', price: 2999, image: 'https://via.placeholder.com/150' }
];

// Login API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt: ${username}`);
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ success: true, token: user.token, userInfo: { username: user.username } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Products API
app.get('/api/products', (req, res) => {
    // In a real app, verify token here
    const token = req.headers.authorization;
    console.log(`Fetching products. Token: ${token}`);
    
    res.json({ success: true, data: products });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
