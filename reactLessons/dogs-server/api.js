const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const uri = 'mongodb+srv://ErezG:Aa123456@test.cxhcq.mongodb.net/classDB?retryWrites=true&w=majority&appName=Test';
const User = require('./models/user.js');
const Favorite = require('./models/favorite.js');

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Database connection error:', err));

router.post('/user', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/user/:id/name', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, { name: req.body.name }, { new: true });
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/user/:id/profilePic', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send(user);
        }    
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndRemove(id);
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/user/:id/favorite', async (req, res) => {
    try {
        const favorite = new Favorite(req.body);
        await favorite.save();
        res.status(201).send(favorite);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/user/:id/favorite/:favoriteId', async (req, res) => {
    try {
        const id = req.params.id;
        const favoriteId = req.params.favoriteId;
        const favorite = await Favorite.findByIdAndRemove(favoriteId);
        if (!favorite) {
            res.status(404).send({ message: 'Favorite not found' });
        } else {
            res.status(200).send(favorite);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/user/:id/favorites', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, skip = 0, limit = 10 } = req.query;
        
        let query = { user: id };
        
        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        
        const favorites = await Favorite.find(query)
            .skip(Number(skip))
            .limit(Number(limit));
            
        res.status(200).send(favorites);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/user/:id/favorites/:favoriteId/name', async (req, res) => {
    try {
        const id = req.params.id;
        const favoriteId = req.params.favoriteId;
        const favorite = await Favorite.findByIdAndUpdate(favoriteId, req.body, { new: true });
        if (!favorite) {
            res.status(404).send({ message: 'Favorite not found' });
        } else {
            res.status(200).send(favorite);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/user/:id/favorites/:favoriteId/name', async (req, res) => {
    try {
        const id = req.params.id;
        const favoriteId = req.params.favoriteId;
        const favorite = await Favorite.findByIdAndUpdate(favoriteId, { $unset: { name: '' } }, { new: true });
        if (!favorite) {
            res.status(404).send({ message: 'Favorite not found' });
        } else {
            res.status(200).send(favorite);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;