const Migrations = artifacts.require("Migrations");
const newNft = artifacts.require("newNft");
const MyContact = artifacts.require("MyContact");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(newNft);
  deployer.deploy(MyContact);
};
