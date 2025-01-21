const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const uri = 'mongodb://127.0.0.1:27017/dogs';
const User = require('./models/user.js');
const Favorite = require('./models/favorite.js');

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Database connection error:', err));

    router.post('/user', async (req, res)=>{
        try {
            if (!req.body.name){
                return res.status(401).json({success: false, error: 'Name is missing'});
            }
            const user = new User({name: req.body.name});
            await user.save();
            res.status(201).json({success: true, data: user});
        } catch(error){
            res.status(400).json({success: false, error});
        }
    });

router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        } else {
            res.status(200).json({ status: 200, data: user });
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: error });
    }
});

router.get('/users', async (req, res)=>{
    try {
        const all = await User.find();
        res.status(200).json({success: true, data: all});
    } catch(error){
        res.status(400).json({success: false, error});
    }
});

router.patch('/user/:id/name', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, { name: req.body.name }, { new: true });
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found' });
        } else {
            res.status(200).json({ success: true, data: user });
        }
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
});

router.patch('/user/:id/profile', async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user){
            return res.status(404).json({success: false, error: 'User not found'});
        }
        if (req.body.profilePic){
            const favorite = await Favorite.findOne({_id: req.body.profilePic, user: req.params.id});
            if (!favorite){
                return res.status(404).json({success: false, error: 'Favorite not found'});
            }
            user.profilePic = req.body.profilePic;
        } else {
            delete user.profilePic;
        }
        await user.save();
        res.status(200).json({success: true, data: user});
    } catch(error){
        res.status(400).json({success: false, error});
    }
});

router.patch('/user/:id/profilePic', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        } else {
            res.status(200).json({ status: 200, data: user });
        }    
    } catch (error) {
        res.status(400).json({ status: 400, error: error });
    }
});

router.delete('/user/:id', async (req, res)=>{
    try {
        const result = await User.deleteOne({_id: req.params.id});
        if (!result.deletedCount){
            return res.status(404).json({success: false, error: 'User not found'});
        }
        res.status(204).json({success: true});
        Favorite.deleteMany({user: req.params.id});
    } catch(error){
        res.status(400).json({success: false, error});
    }
});

router.post('/user/:id/favorite', async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user){
            return res.status(404).json({success: false, error: 'User not found'});
        }
        if (!req.body.imageSrc){
            return res.status(401).json({success: false, error: 'Missing imgSrc'});
        }
        const oldFavorite = await Favorite.findOne({imageSrc: req.body.imageSrc, user: req.params.id});
        if (oldFavorite){
            return res.status(400).json({success: false, data: 'The user already liked it'});
        }
        const newFavorite = new Favorite({imageSrc: req.body.imageSrc, user: req.params.id});
        await newFavorite.save();
        res.status(201).json({success: true, data: newFavorite});
    } catch(error){
        res.status(400).json({success: false, error});
    }
});

router.delete('/user/:id/favorite/:favoriteId', async (req, res) => {
    try {
        const id = req.params.id;
        const favoriteId = req.params.favoriteId;
        const favorite = await Favorite.findByIdAndRemove(favoriteId);
        if (!favorite) {
            return res.status(404).json({ status: 404, message: 'Favorite not found' });
        } else {
            res.status(200).json({ status: 200, data: favorite });
            if(user.profilePic == favoriteId) {
                await User.findByIdAndUpdate(id, { profilePic: '' });
            }
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: error });
    }
});

router.get('/user/:id/favorites', async (req, res)=>{
    const query = {user: req.params.id};
    const options = {};
    if (req.query.name){
        query.name = {$regex: req.query.name};
    }
    if (req.query.limit){
        options.limit = +req.query.limit;
    }
    if (req.query.skip){
        options.skip = +req.query.skip;
    }
    try {
        const data = await Favorite.find(query, {}, options);
        res.status(200).json({success: true, data});
    } catch(error){
        res.status(400).json({success: false, error})
    }
});

router.patch('/user/:id/favorites/:favoriteId/name', async (req, res) => {
    try {
        const id = req.params.id;
        const favoriteId = req.params.favoriteId;
        const favorite = await Favorite.findByIdAndUpdate(favoriteId, req.body, { new: true });
        if (!favorite) {
            res.status(404).json({ status: 404, message: 'Favorite not found' });
        } else {
            res.status(200).json({ status: 200, data: favorite });
        }
    } catch (error) {
        res.status(400).json({ status: 400, error: error });
    }
});

router.delete('/user/:id/favorites/:favoriteId', async (req, res) => {
    try {
        console.log(req.params);
        const result = await Favorite.deleteOne({_id: req.params.favoriteId, user: req.params.id});
        if (!result.deletedCount){
            await res.status(404).json({success: false, error: 'Favorite not found'});
        }
        const user = await User.findById(req.params.id);
        if (user.profilePic==req.params.favoriteId){
            delete user.profilePic;
            await user.save();
        }
        res.status(200).json({success: true});
    } catch(error){
        res.status(400).json({success: false, error});
    }
});

module.exports = router;