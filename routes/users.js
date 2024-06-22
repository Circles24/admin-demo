import express from 'express';
import prismaClient from '../prisma/client.js'

var router = express.Router();

router.get('/', async function(req, res, next) {
  const users = await prismaClient.user.findMany()
  res.json({ users: users })
});

export { router }