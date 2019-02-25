const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider()); //if we want to connect to a public network we just change the provider
const {interface, bytecode} = require("../compile");

let accounts;
let inbox;
beforeEach(async ()=>{
    //Get a list of all accounts

  accounts = await web3.eth.getAccounts()
    //use one account to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))  // Teaches web3 about what methods an Inbox contract has (convert interface to Javascript object) 
  .deploy({ data: bytecode, arguments: ['apple!'] })  // Tells web3 that we want to deploy a new copy of this contract, create the obj
    .send({from: accounts[0], gas:'1000000'}) // Instructs web3 to send out a transaction that create this contract 
})

describe('Inbox', ()=>{
    it('deploys a contract', ()=> {
        //console.log(inbox.address);

        assert.ok(inbox.options.address); // if the address exist => the contract is deployed
    });

    it('has a default message', async () => {
      const message = await inbox.methods.message() // inbox.methods : all methods in the contract
      .call();    // call to retreve data : instantaneous read only opération
       assert.equal(message ,'apple!')
     });

    it('can change the message', async () => {
       await inbox.methods.setMsg('orange!')
       .send({ from : accounts[0] }); // send( from : account) : send a transaction
       const message = await inbox.methods.message().call();
       assert.equal(message ,'orange!')
      
     });
})


