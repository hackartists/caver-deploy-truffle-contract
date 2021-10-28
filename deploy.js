const Caver = require("caver-js");
const exchange = require("./build/contracts/Exchange.json");

const chainId = Number(process.env.CHAIN_ID);
const kasAccessKey = process.env.KAS_ACCESS_KEY;
const kasSecretKey = process.env.KAS_SECRET_KEY;
const ownerPrivateKey = process.env.PRIVATE_KEY;
const owner = process.env.ADDRESS;

const endpoint = `https://${kasAccessKey}:${kasSecretKey}@node-api.klaytnapi.com/v1/klaytn?chain-id=${chainId}`;

(async () => {
    const caver = new Caver(endpoint);
    caver.wallet.newKeyring(owner, ownerPrivateKey);
    const contract = new caver.contract(exchange.abi);

    const result = await contract.deploy(
        { from: owner, gas: 7000000, value: 0 },
        exchange.bytecode,
    );

    const cont = result._address;
    console.log(`${chainId} Chain: ${cont}`);
})();
