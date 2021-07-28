
//testing is in development....

var DMCToken = artifacts.require("DMCToken");

contract('DMCToken', function(accounts) {
    var tokenInstance;

    it('initializes the contract with the proper attributes', function() {
        return DMCToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            expect(name).equal('DreamCoin', 'correct name');
            return tokenInstance.symbol();
        }).then(function(symbol) {
            expect(symbol).equal('DMC', 'correct symbol');
        });
    })

    it('sets the total supply upon deployment', function() {
        return DMCToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
           assert.equal(totalSupply.toNumber(), 10000000000000, 'sets total supply to 10,000,000,000,000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 10000000000000, 'allocates intitial supply to admin');
        });
    });
})