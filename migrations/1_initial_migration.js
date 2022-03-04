const Migrations = artifacts.require("Migrations");
const newNft = artifacts.require("newNft");
const token = artifacts.require("Token");
const MyContact = artifacts.require("MyContact");

module.exports = async function (deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(newNft);
  await deployer.deploy(token);
  await deployer.deploy(MyContact, newNft.address, token.address);
};
