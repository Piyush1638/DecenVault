// API Key: 7aForIiisF6D0NIyeo3uhn6jUOBojgTf

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.0",
  networks:{
    goerli:{
      url: "https://eth-goerli.g.alchemy.com/v2/7aForIiisF6D0NIyeo3uhn6jUOBojgTf",
      accounts: ['72bf4dd682df41f47b9b1868b1da6fa31051d1068e12e75c3ff006eaf3ed2a65']
    }
  }

}