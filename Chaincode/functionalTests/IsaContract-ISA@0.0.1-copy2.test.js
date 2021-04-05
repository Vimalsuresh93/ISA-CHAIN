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
    const walletPath = path.join(homedir, 'KBA', 'isa-chain', 'Network', 'wallets', 'CorporationDepartment');
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

    describe('tcCertificateExists', () =>{
        it('should submit tcCertificateExists transaction', async () => {
            // TODO: populate transaction parameters
            const arg0 = 'EXAMPLE';
            const args = [ arg0];

            const response = await SmartContractUtil.submitTransaction('IsaContract', 'tcCertificateExists', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('createTcCertificate', () =>{
        it('should submit createTcCertificate transaction', async () => {
            // TODO: populate transaction parameters
            const arg0 = 'EXAMPLE';
            const arg1 = 'EXAMPLE';
            const arg2 = 'EXAMPLE';
            const arg3 = 'EXAMPLE';
            const arg4 = 'EXAMPLE';
            const arg5 = 'EXAMPLE';
            const args = [ arg0, arg1, arg2, arg3, arg4, arg5];

            const response = await SmartContractUtil.submitTransaction('IsaContract', 'createTcCertificate', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('readTcCertificate', () =>{
        it('should submit readTcCertificate transaction', async () => {
            // TODO: populate transaction parameters
            const arg0 = 'EXAMPLE';
            const args = [ arg0];

            const response = await SmartContractUtil.submitTransaction('IsaContract', 'readTcCertificate', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

    describe('RenewTcCertificate', () =>{
        it('should submit RenewTcCertificate transaction', async () => {
            // TODO: populate transaction parameters
            const arg0 = 'EXAMPLE';
            const arg1 = 'EXAMPLE';
            const arg2 = 'EXAMPLE';
            const arg3 = 'EXAMPLE';
            const arg4 = 'EXAMPLE';
            const args = [ arg0, arg1, arg2, arg3, arg4];

            const response = await SmartContractUtil.submitTransaction('IsaContract', 'RenewTcCertificate', args, gateway); // Returns buffer of transaction return value
            // TODO: Update with return value of transaction
            // assert.equal(JSON.parse(response.toString()), undefined);
        }).timeout(10000);
    });

});
