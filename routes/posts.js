import express from 'express';
import prismaClient from '../prisma/client.js'

var router = express.Router();

router.get('/', async function(req, res, next) {
  const posts = await prismaClient.post.findMany()
  res.json({ posts: posts })
});

export { router }