const User = require('../models').User;
const resourceService   = require('./../services/ResourceService');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let err, resource;

    [err, resource] = await to(resourceService.createResource(body));

    if(err) return ReE(res, err, 422);
    return ReS(res, {message:'Successfully added new resource.', user:resource.toWeb(), token:user.getJWT()}, 201);
}
module.exports.create = create;



const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    console.log("hello")
    let user = req.user;
    // let companies = await user.Companies()

    return ReS(res, {user:user.toWeb(), companies: await user.Companies(), jwt: user.getJWT()});
}
module.exports.get = get;


const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    console.log("hello")
    let user = req.user;
    // let companies = await user.Companies()

    return ReS(res, {user:user.toWeb(), companies: await user.Companies(), jwt: user.getJWT()});
}
module.exports.getAll = getAll;