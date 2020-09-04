const {Router} = require('express');
const Notes = require('../models/notes.model');
const router = Router();


router.get('/', async(req,res)=>{
    try{
        const notes = await Notes.getAll();
        res.status(200).json(notes);
        
    }catch(e){
        res.status(500).json(e.message);
    }
})
router.get('/:id', async(req,res)=> {
    try{
        const note = await Notes.findById( req.params.id)
        if(!note){
            res.json({})
        }
        res.status(200).json(note);
    }catch(e){
        res.status(500).json(e.message);
    }
})

router.post('/create', async(req,res)=>{
    try{    
        const note = new Notes(req.body.title, req.body.description)
        await note.save();
        res.status(201).json({message: 'note created'});
    }catch(e){
        res.status(500).json(e.message);
    }
})

router.put('/edit/:id', async(req,res)=> {
    try{
        await Notes.updateOne(req.body);
        res.status(204).json({message: 'success'});
    }catch(e){
        res.status(500).json(e.message);
    }
})

router.delete('/delete/:id', async(req,res)=> {
    try{
        await Notes.deleteOne(req.params.id);
        res.status(204).json({message: 'success'});
    }catch(e){
        res.status(500).json(e.message);
    }
})

module.exports = router;