//import logo from './logo.svg';
import './App.scss';
import React, {useEffect, useState} from 'react';
import Web3 from "web3";
import Navbar from "./Navbar";
import DMCToken from "./contracts/DMCToken.json";
import DMCTokenSale from "./contracts/DMCTokenSale.json";

const App = () => {
  const [refresh, setrefresh] = useState(0);

  let content;
  const [loading2, setloading2] = useState(false);

  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);


  const [TokenName, setTokenName] = useState("");
  const [TokenSymbol, setTokenSymbol] = useState("");
  const [TokenTotalSupply, setTotalSupply] = useState("");
  const [TokenAddressInCrowdSale, setTokenAddressInCrowdSale] = useState("");
  const [TokenOwner, setTokenOwner] = useState("");

  const [BalanceOfUser, setBalanceOfUser] = useState(0);
  const [TokenPrice, setTokenPrice] = useState(0);
  const [TokensSold, setTokensSold] = useState(0);

  const [PresaleContractInstance, setPresaleContractInstance] = useState({});
  const [InputFieldOnChange, setInputFieldOnChange] = useState(0);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    setLoading(true);
    if (
      typeof window.ethereum == "undefined" 
    ) {
      return;
    }
    const web3 = new Web3(window.ethereum);

    let url = window.location.href;
    console.log(url);

    const accounts = await web3.eth.getAccounts();


    if (accounts.length === 0) {
      return;
    }
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    console.log(networkId);

    web3.eth.getBlockNumber(function(error, result){ 
      if (!error)
        console.log("block number => " + result)
    });
    
    
    if (networkId === 3) {
      const dmctoken_contract = new web3.eth.Contract(DMCToken.abi, "0x220a3ddb67ff5b9c50318e3ee1dc358f05cbdfd6");
      
      const name = await dmctoken_contract.methods.name().call();
      setTokenName(name);
      const symbol = await dmctoken_contract.methods.symbol().call();
      setTokenSymbol(symbol);
      const totalSupply = await dmctoken_contract.methods.totalSupply().call();
      setTotalSupply(totalSupply);
      const totalSupplydecimals = await web3.utils.fromWei(totalSupply, 'ether');
      const owner = await dmctoken_contract.methods.owner().call();
      setTokenOwner(owner);
      const balanceOf = await dmctoken_contract.methods.balanceOf(accounts[0]).call();
      //const balanceofinwei = await web3.utils.fromWei(balanceOf, 'ether');
      setBalanceOfUser(balanceOf);
      const dmctokensale_contract = new web3.eth.Contract(DMCTokenSale.abi, "0x923DF9EE659f65489e4Bd65d7bf5A9534F2f4ee3");
      setPresaleContractInstance(dmctokensale_contract);
      const dmctokenpresale = await dmctokensale_contract.methods.tokenContract().call();
      setTokenAddressInCrowdSale(dmctokenpresale);
      const tokenpriceofpresale = await dmctokensale_contract.methods.tokenPrice().call();
      const tokenpriceofpresaleinether = await web3.utils.fromWei(tokenpriceofpresale, 'ether');
      setTokenPrice(tokenpriceofpresaleinether);
      const tokensoldpresale = await dmctokensale_contract.methods.tokensSold().call();
      const tokensoldpresaleinether = await web3.utils.fromWei(tokensoldpresale, 'ether');
      setTokensSold(tokensoldpresaleinether);

      // console.log("Contract to be used in presale: ", dmctokenpresale)
      // console.log("Price of token in Ether: ", tokenpriceofpresaleinether)
      // console.log("Address of Presale Contract: ", dmctokensale_contract)
      // console.log("Tokens sold in Ether: ", tokensoldpresaleinether);

      console.log(balanceOf)
      console.log(dmctoken_contract)
      console.log(name)
      console.log(symbol)
      console.log(totalSupply)
      console.log("Total supply price in Ether:", totalSupplydecimals)
      console.log(TokenOwner)
      console.log(accounts)

      setLoading(false);
    } else {
      window.alert("the contract not deployed to detected network. " + networkId);
      setloading2(true);
    }
  };

  const ChangeInputField = (e)=> {
    setInputFieldOnChange(e.target.value);
  }

  const SubmitInputField = async ()=> {
    if(parseFloat(InputFieldOnChange) > 0){
      await onclick(InputFieldOnChange)
    }
    else{
      window.alert("Enter an amount greater than 0");
    }
  }

  const onclick = async (a) => {
    const web3 = new Web3(window.web3);
    const amountofethinwei = await web3.utils.toWei(a.toString())
    console.log(amountofethinwei);
    await PresaleContractInstance
    .methods
    .buyTokens(account)
    .send({from: account, value: amountofethinwei})
    .once("recepient", (recepient) => {
          window.alert("success");
        })
        .on("error", () => {
          window.alert("Error: Transaction failed.");
        });
  };

  const walletAddress = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    window.location.reload();
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();

    if (refresh === 1) {
      setrefresh(0);
      loadBlockchainData();
    }
    //esl
  }, [refresh]);

  if (loading === true) {
    content = (
      <div className="text-center">
        Loading...{loading2 ? <div>loading....</div> : ""}
      </div>
    );
  } else {
    content = (
      <div className="container">
        <main role="main" className="container">
          <div className="jumbotron">
            <h1>DMCToken Exchange</h1>
            <div className="row" style={{ paddingTop: "30px" }}>
              {" "}
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Token Name: {TokenName}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Token Symbol: {TokenSymbol}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Token Remaining Supply: {TokenTotalSupply}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Token Price (In Ether): {TokenPrice}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Tokens Sold: {TokensSold}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Balance Of Account ({account}): {BalanceOfUser}</h3>
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <h3>Token Address In CrowdSale: </h3>{TokenAddressInCrowdSale}
              </div>
              <div className="row" style={{ paddingLeft: "40px" }}>
                <input 
                value="0" 
                placeholder="Input An Eth Amount"
                value={InputFieldOnChange}
                onChange={ChangeInputField}
                />
                <button className="btn btn-primary" onClick={SubmitInputField}>Buy Tokens</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar account={account} />

      {account === "" ? (
        <div className="container">
          {" "}
          Connect your wallet to application{"   "}{" "}
          <button onClick={walletAddress}>metamask</button>
        </div>
      ) : (
        content
      )}
      {/* {content} */}
    </div>
  );
};

export default App;