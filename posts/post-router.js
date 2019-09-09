const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    // db.select('*') <<select all
    db('posts').select('id', 'title', 'contents')
        .from('posts')
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.json(err)
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('posts')
    .where({ id })
    .first()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.json(err)
    })
});

router.post('/', (req, res) => {
    const postData = req.body;

    db('posts')
    .insert(postData, 'id')
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.json(err)
    })
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    db('posts')
        .where({ id })
        .update(changes)
        .then(count => {
            res.status(200).json({ message: `updated ${count}`})
        })
        .catch(err => {
            res.json(err)
        })

});

router.delete('/:id', (req, res) => {
    db('posts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            res.status(200).json({ message: `deleted ${count}`})
        })
        .catch(err => {
            res.json(err)
        })
});

module.exports = router;