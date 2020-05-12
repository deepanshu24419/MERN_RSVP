const router = require('express').Router();
const auth  = require('../middleWare/auth');
const {check,validationResult} = require('express-validator');
//Guest Model 

const Guest = require('../models/Guest');


//get guest 

router.get('/', auth,async (req,res) => {
try {
    const guests = await Guest.find({user: req.user.id})
    res.json(guests)
} catch (err) {
    console.error(err.message)
    res.status(500).send('server error')
}
})
 

//post guest


router.post('/', auth,
[
    check('name','please provide name').not().isEmpty(),
    check('phone','please provide phone').not().isEmpty(),
   
    
],
async  (req,res) => {
     const errors = validationResult(req)
     if(!errors.isEmpty()){
         return res.status(400).json({error: errors.array()})

     }

    const {name,phone,dietary,isConfirmed} = req.body


    try {
        let guest = new Guest({
            user: req.user.id,
            name,
            phone,
            dietary,
            isConfirmed
    
        })
        guest =await guest.save()
        res.json(guest)


    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
   
})

// delete guest


router.delete('/:id',auth, async (req,res) => {
try {
    let guest = await Guest.findById(req.params.id)
    if(!guest) {
        return res.status(404).json({msg:'Guest not found'})

    }
    await Guest.findByIdAndRemove(req.params.id)
    res.send('guest removed')

} catch (err) {
    console.error(err.message)
    res.status(500).send('Server error') 
}
})


//update guest

router.put('/:id',auth, async (req,res) => {
    const {name,phone,dietary,isConfirmed} = req.body
    const udatedGuest = {name,phone,dietary,isConfirmed}

    try {
       
        let guest = await Guest.findById(req.params.id)
        if(!guest) {
            return res.status(404).json({msg:'Guest not found'})
    
        }
      guest =  await Guest.findByIdAndUpdate(req.params.id,  {$set : udatedGuest },{new: true} )

        res.send(guest)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
} )

module.exports = router