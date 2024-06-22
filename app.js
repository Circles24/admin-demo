import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource, getModelByName } from '@adminjs/prisma';

import { router as postsRouter } from './routes/posts.js';
import { router as usersRouter } from './routes/users.js';

import prismaClient from './prisma/client.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

app.get('/', (req, res, next) => res.send('Hola Amigo!'));

AdminJS.registerAdapter({ Database, Resource })

const adminOptions = {
  resources: [{
    resource: { model: getModelByName('User'), client: prismaClient },
    options: {},
  }, {
    resource: { model: getModelByName('Post'), client: prismaClient },
    options: {},
  }],
}

const admin = new AdminJS(adminOptions);
const adminRouter = AdminJSExpress.buildRouter(admin)
app.use("/admin", adminRouter);

app.use('/user', usersRouter);
app.use('/post', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});


export default app