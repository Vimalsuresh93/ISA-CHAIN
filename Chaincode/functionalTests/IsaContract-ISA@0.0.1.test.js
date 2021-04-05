/*
* Use this file for functional testing of your smart contract.
* Fill out the arguments and return values for a function and
* use the CodeLens links above the transaction blocks to
* invoke/submit transactions.
* All transactions defined in your smart contract are used here
* to generate tests, including those functions that would
* normally only be used on instantiate and upgrade operations.
* This basic test file can also be used as the basis for building
* further functional tests to run as part of a continuous
* integration pipeline, or for debugging locally deployed smart
* contracts by invoking/submitting individual transactions.
*/
/*
* Generating this test file will also trigger an npm install
* in the smart contract project directory. This installs any
* package dependencies, including fabric-network, which are
* required for this test file to be run locally.
*/

'use strict';

const assert = require('assert');
const fabricNetwork = require('fabric-network');
const SmartContractUtil = require('./js-smart-contract-util');
const os = require('os');
const path = require('path');

describe('IsaContract-ISA@0.0.1' , () => {

    const homedir = os.homedir();
    const walletPath = path.join(homedir, 'KBA', 'isa-chain', 'Network', 'wallets', 'ElectricityDepartment');
    const gateway = new fabricNetwork.Gateway();
    const wallet = new fabricNetwork.FileSystemWallet(walletPath);
    const identityName = 'admin';
    let connectionProfile;

    before(async () => {
        connectionProfile = await SmartContractUtil.getConnectionProfile();
    });

    beforeEach(async () => {

        const discoveryAsLocalhost = SmartContractUtil.hasLocalhostURLs(connectionProfile);
        const discoveryEnabled = true;

        const options = {
            wallet: wallet,
            identity: identityName,
            discovery: {
                asLocalhost: discoveryAsLocalhost,
                enabled: discoveryEnabled
            }
        };

        await gateway.connect(connectionProfile, options);
    });

    afterEach(async () => {
        gateway.disconnect();
    });


    describe('electricityCertificateExists', () =>{
        it('should submit electricityCertificateExists transaction', async () => {
            // TODO: populate transaction parameters
            const arg0 = 'EXAMPLE';
            const args = [ arg0];

            const response = await SmartContractUtil.submitTransaction('IsaContract', 'electricityCertificateExists', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            assert.equal(JSON.parse(response.toString()), true);
        }).timeout(10000);
    });

    describe('createElectricityCertificate', () =>{
        it('should submit createElectricityCertificate transaction', async () => {
            // TODO: populate transaction parameters
            const arg0 = 'E123';
            const arg1 = '12';
            const arg2 = 'Vimal Bhavan';
            const arg3 = 'F123';
            const arg4 = '12-02-2020';
            const arg5 = '678';
            const arg6 = '234';
            const arg7 = '3';
            const arg8 = '678';
            const arg9 = 'C';
            const args = [ arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9];

            await SmartContractUtil.submitTransaction('IsaContract', 'createElectricityCertificate', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('readElectricityCertificate', () =>{
        it('should submit readElectricityCertificate transaction', async () => {
            // TODO: populate transaction parameters
            const arg0 = 'E123';
            const args = [ arg0];

            const response = await SmartContractUtil.submitTransaction('IsaContract', 'readElectricityCertificate', args, gateway);
            await console.log(JSON.parse(response.toString()));
            // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            await assert.equal(JSON.parse(response.toString()),{buildingid:'12',buildingdetails:'Vimal Bhavan', firecertificateid:'F123', expirydate:'12-02-2020', totalelectricity:'678', firepumpload:'234', nofirepumps:'3', electricalroomarea:'678', elecbuildingcat:'C',status:'Approved'});
        }).timeout(10000);
    });

    describe('RenewElectricityCertificate', () =>{
        it('should submit RenewElectricityCertificate transaction', async () => {
            // TODO: populate transaction parameters
            const arg0 = 'E123';
            const arg1 = 'F123';
            const arg2 = '12-02-2020';
            const arg3 = 'EXAMPLE';
            const args = [ arg0, arg1, arg2, arg3];

            await SmartContractUtil.submitTransaction('IsaContract', 'RenewElectricityCertificate', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });
});
