const router = require("express").Router();
const axios = require("axios");
const { User, Plan} = require("../db/models");

//get all users path localhost:8080/api/user
router.get('/', async(req,res,next)=>{
	try {
		const users = await User.findAll();
		res.json(users);
		
	} catch (error) {
		console.error(error);
		next(error);
	}

})
//get plan for depending on bmi. place name of bmi class at :id,
//same as get :id in fitnessPlan path
router.get('/exercise/:plan',async(req, res, next)=>{
	try {
		const plan = await Plan.findAll({where:{ BMIClass: req.params.plan}});
		res.json(plan);
		
	} catch (error) {
		console.error(error);
		next(error);
	}
})
//get by email path localhost:8080/api/user/:id
router.get('/:email', async(req,res,next)=>{
	try {
		const user = await User.findOne({where: {email: req.params.email}});
		if(user === null)
			res.json({message:"no user by this ID"})
		else
			res.json(user);
		
	} catch (error) {
		console.error(error);
		next(error);
	}

})


//create new user localhost:8080/api/user
//only an email is required. runs in frontend if firebase auth goes through
router.post('/', async(req,res,next)=>{
	try {
		const newUser = await User.create(req.body);
		res.json(newUser);
		
	} catch (error) {
		console.error(error);
		next(error);
	}
})
//update user info path localhost:8080/api/user/:id
//:id will be email. this finds by email
router.put('/:id', async(req,res,next)=>{
	try {
		let user = await User.findOne({where: {email: req.params.id}});
		if(user === null)
			res.json({message:"no user by this ID"})
		else{
			user.update({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				weight: req.body.weight,
				height: req.body.height,
				BMI: req.body.BMI,
				exercise: req.body.exercise
			})
			res.json(user);
		}
	} catch (error) {
		console.error(error)
		next(error);
	}
})

module.exports = router;
