const prisma = require("../../utils/dbClient");
const jwt = require("jsonwebtoken");

async function getPosts(req, res) {
  try {
    const allPosts = await prisma.post.findMany();

    res.status(201).json({ allPosts });
  } catch (error) {
    console.error({ error });

    res.status(500).json({ error });
  }
}

async function oneUserPosts(req, res) {
  console.log("headers token", req.headers.authorization, "\nbody: ", req.body);
  const token = req.headers.authorization;

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      throw Error("Not Authorised");
    }

    console.log("payload:", payload);

    try {
      const userPosts = await prisma.post.findMany({
        where: {
          userId: payload.id,
        },
        include: {
          user: true,
        },
      });

      res.status(201).json({ userPosts });
    } catch (error) {
      console.error({ error });

      res.status(500).json({ error });
    }
  });
}

module.exports = {
  getPosts,
  oneUserPosts,
};
