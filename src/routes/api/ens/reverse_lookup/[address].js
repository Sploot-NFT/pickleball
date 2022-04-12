import detectEthereumProvider from '@metamask/detect-provider';
import ENS, { getEnsAddress } from '@ensdomains/ensjs'
import { ethers } from "ethers";

/** @type {import('./[address]').RequestHandler} */
export async function get({ params }) {   
    if (params.address) { // Make sure parameters are present
        const provider = new ethers.providers.JsonRpcProvider("https://cloudflare-eth.com/")
        const ens = new ENS({ provider , ensAddress: getEnsAddress('1') })
        let ensName = null;
        ({ name: ensName } = await ens.getName(params.address))
        console.log(ensName);
        console.log(await ens.name(ensName).getAddress())
        // Check to be sure the reverse record is correct. skip check if the name is null
        if(ensName == null || params.address != (await ens.name(ensName).getAddress()).toLowerCase()) {
            ensName = "";
        }
        return {status: 200, body: {ensName}};
    }
   
    return {
        status: 404,
    };
  }