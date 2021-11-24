const prisma = require("../../utils/dbClient")

const signup = async (req, res) => {

    const userCredentials = req.body;

    try{

        const user = await prisma.user.create({
            data : {...userCredentials}
        })

        res.status(200).json({ user })

    }catch(error) { 

        console.error({error: error.message})

        res.status(401).json({error: error.message})
    }

}

async function signin(req, res){ 

    const { email, password } = req.body;

    console.log({body : req.body})

    if(!req.body.email || !req.body.password){ 
        res.status(400).json({ error : "One of the sigin credentials are missing"})
    }

    try{ 
        const user = await prisma.user.findUnique({
            where : { 
                email
            }
        })

        if(!user){ 
            res.status(401).json({ error : "Authentification failed."})
        }

        if(user.password === password){ 
            res.status(201).json({user})
        } else { 
            res.status(401).json({ error : "Authentification failed."})
        }

    }catch(error){ 

        console.error({error})

        res.staus(500).json({ error })
    }

}

module.exports = {signup, signin}


/*
theUser 
{user: {…}}
user: {id: 19, email: 'user@user.user', password: 'user'}
[[Prototype]]: Object

*/ 