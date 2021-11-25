const prisma = require("../../utils/dbClient")

async function getPostsByid(req,res){ 


    console.log("req", req.headers )
    // const userId = req.headers.authorization

    try{

        const postsById = await prisma.post.findMany({
            where : { 
                userId
            }
        })
        
    }catch(error) {
        console.error({error})
    }
}

async function getPosts(req,res){ 

    try{

        const postsById = await prisma.post.findMany({
            where : { 
                userId
            }
        })
        
    }catch(error) {
        console.error({error})
    }
}

module.exports = {getPostsByid, getPosts}