"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import * as companyRouter from './routers/company';
// import * as userRouter from './routers/user';
// import * as taskRouter from './routers/task';
// import * as logRouter from './routers/log';
// import * as adminRouter from './routers/admin';
// import * as Company from './models/company';
// import * as User from './models/user';
// import * as Task from './models/task';
const companyRouter = require('./routers/company');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const logRouter = require('./routers/log');
const adminRouter = require('./routers/admin');
const Company = require('./models/company');
const User = require('./models/user');
const Task = require('./models/task');
require('./db/sequelize');
const app = express_1.default();
Company.hasMany(User);
User.belongsTo(Company);
User.hasMany(Task);
Task.belongsTo(User);
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(companyRouter);
app.use(userRouter);
app.use(taskRouter);
app.use(logRouter);
app.use(adminRouter);
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
//# sourceMappingURL=index.js.map