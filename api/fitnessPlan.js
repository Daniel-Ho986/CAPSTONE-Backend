const router = require("express").Router();
const { Plan } = require("../db/models");

router.get("/",async(req,res,next)=>{
    try {
        const plan = await Plan.findAll();
        res.json(plan);      
    } catch (error) {
        console.log(error);
        next(error);
    }
})
router.post("/", async (req, res, next)=>{
    try {
        const plan = await Plan.create(req.body);
        res.json(plan);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
})
module.exports = router;