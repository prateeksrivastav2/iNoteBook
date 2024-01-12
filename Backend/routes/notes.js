const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Route 1 : Fetch all notes of a user
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        //console.log(error);
        res.status(500).send("Error Occured");
    }
});


//Route 2 : Add notes to a user


router.post('/addnote', fetchuser, [
    // For validation
    body('title', "Enter a Valid Title").isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters long').isLength({ min: 5 }),
],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // const user = 
            // //console.log(req.body);
            const { title, description, tag } = req.body
            const note = new Note({
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag,
                user: req.user.id
            })
            const savenote = await note.save();
            res.json(savenote);
        } catch (error) {
            //console.log(error);
            res.status(500).send("Error Occured m");
        }
    });

// Router 3 to update note 
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const newNote = {};
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }
            // check for note that to updated is present or not 
            let note = await Note.findById(req.params.id);
            if (!note.user) { res.status(404).send("notfound") }
            // check for the correct user

            if (note.user.toString() !== req.user.id) { return res.status(401).json({ msg: "Unauthorized" }) }

            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json(note);
        } catch (error) {
            //console.log(error);
            res.status(490).send("Error Occured m");
        }
    });

//Route : 4 to delete a particular note 

router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {

        // const { title, description, tag } = req.body;

        // check for note that to deleted is present or not 
        try {

            let note = await Note.findById(req.params.id);
            // if(!note){res.status(404).send("notfound")}
            // check for the correct user 
            if (!note.user) { res.status(404).send("notfound") }
            if (note.user.toString() !== req.user.id) { return res.status(401).json({ msg: "Unauthorized" }) }
            note = await Note.findByIdAndDelete(req.params.id);
            res.json({ "Success": "Note is deleted ", note: note });
        } catch (error) {
            //console.log(error);
            res.status(500).send("Error Occured m");
        }
    });

module.exports = router;
