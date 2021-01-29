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
//get plan for depending on bmi. place name of bmi class at :id, 
router.get('/:id',async(req, res, next)=>{
	try {
		const plan = await Plan.findAll({where:{ BMIClass: req.params.id}});
		res.json(plan);
		
	} catch (error) {
		console.error(error);
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
router.put("/:id", async (req, res, next)=>{
    try {
        const plan = await Plan.findOne({where: {BMIClass: req.params.id}})
        plan.update({
            dietOptions: req.body.dietOptions,
            exercises: req.body.exercises,
            risks: req.body.risks
        })
        res.json(plan)
        
    } catch (error) {
        console.log(error);
        next(error);
    }
})
module.exports = router;