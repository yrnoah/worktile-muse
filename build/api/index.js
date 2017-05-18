const express = require('express');

const db = require('sqlite');
const { createTableIfNotExisted } = require('./create-table');

const serverApi = express.Router();

serverApi.post('/create_user', async (req, res, next) => {
  try {
    const { name, password } = req.body.user;
    createTableIfNotExisted('USERS');
    const users = await db.all("SELECT * FROM 'USERS'");
    const id = users.length + 1;
    await db.run("INSERT INTO 'USERS' VALUES (?, ?, ?)", id, name, password);
    res.send({ success: true });
    next();
  } catch (e) {
    res.send({ success: false, error: e });
  }
});

serverApi.post('/create_table', async (req, res, next) => {
  try {
    const { table } = req.body;
    const result = createTableIfNotExisted(db, table);
    res.send({ success: true, result });
    next();
  } catch (e) {
    res.send({ success: false, error: e });
  }
});

serverApi.get('/get_users', async (req, res, next) => {
  try {
    createTableIfNotExisted('USERS');
    const result = await db.all("SELECT * FROM 'USERS'");
    res.send({ success: true, result });
    next();
  } catch (e) {
    res.send({ success: false, error: e });
  }
});

serverApi.get('/get_messages', async (req, res, next) => {
  try {
    createTableIfNotExisted('MESSAGES');
    const result = await db.all("SELECT * FROM 'MESSAGES'");
    res.send({ success: true, result });
    next();
  } catch (e) {
    res.send({ success: false, error: e });
  }
});

serverApi.post('/create_message', async (req, res, next) => {
  try {
    const { user, content, timesmap } = req.body.message;
    createTableIfNotExisted('MESSAGES');
    const messages = await db.all("SELECT * FROM 'MESSAGES'");
    const id = messages.length + 1;
    await db.run("INSERT INTO 'MESSAGES' VALUES (?, ?, ?, ?)", id, user, content, timesmap);
    res.send({ success: true });
    next();
  } catch (e) {
    res.send({ success: false, error: e });
  }
});

module.exports = { serverApi, db };
