const router = require("express").Router();
const { User } = require("../db/models");

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

//get by id path localhost:8080/api/user/:id
router.get('/:id', async(req,res,next)=>{
	try {
		const user = await User.findByPk(req.params.id);
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
router.put('/:id', async(req,res,next)=>{
	try {
		let user = await User.findByPk(req.params.id);
		if(user === null)
			res.json({message:"no user by this ID"})
		else{
			user.update({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				weight: req.body.weight,
				BMI: req.body.BMI
			})
			res.json(user);
		}
	} catch (error) {
		console.error(error)
		next(error);
	}
})

module.exports = router;
