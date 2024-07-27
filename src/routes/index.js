const RootUser = require('./user/rootUser');
const AdminUser = require('./user/adminUser');
const ChildUser = require('./user/childUser');

const UserGroup = require('./group/UserGroup');
function route(app){
    app.use('/root',RootUser);
    app.use('/admin',AdminUser);
    app.use('/child',ChildUser);

    app.use('/group',UserGroup);
}

module.exports = route;