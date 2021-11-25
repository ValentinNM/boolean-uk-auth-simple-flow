const prisma = require("../../utils/dbClient")
const bcrypt = require('bcrypt');

const saltRounds = 9;

const signup = async (req, res) => {

    const userCredentials = req.body;
    
    const reqPassword = userCredentials.password

    const hashedPass = await bcrypt.hash(reqPassword, saltRounds)

    console.log({hashedPass})

    try{

        const user = await prisma.user.create({
            data : {
                email : userCredentials.email, 
                password: hashedPass
            }
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

        const match = await bcrypt.compare( password, user.password )

        if(match){ 
            res.status(201).json({user})
        } else { 
            res.status(401).json({ error : "Authentification failed."})
        }

    }catch(error){ 

        console.error({error})

        res.status(500).json({ error })
    }

}

module.exports = {signup, signin}
