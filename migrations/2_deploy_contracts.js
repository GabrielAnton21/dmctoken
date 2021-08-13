const DMCToken = artifacts.require("DMCToken");
const DMCTokenSale = artifacts.require("DMCTokenSale");

module.exports = function (deployer) {
  deployer.deploy(DMCToken, DMCToken.address)
  .then(function() {
    var tokenPrice = 470000000000000;
  deployer.deploy(DMCTokenSale, DMCToken, tokenPrice);
  });
};
