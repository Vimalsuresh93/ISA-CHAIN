/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const shim = require('fabric-shim');

class IsaContract extends Contract {
    //FIRE DEPARTMENT

    //Checking Fire Certificate Existance
    async fireCertificateExists(ctx, firecertificateid){
        const buffer = await ctx.stub.getState(firecertificateid);
        return (!!buffer && buffer.length > 0);
    }

    //Creating Fire Certificate
    async createfireCertificate(ctx, firecertificateid, buildingid, buildingdetails, expirydate
        ,totalarea,buildingheight,category,tankcapacity,nofirepumps,firepumpload,pumproomarea) {
        let logger = shim.newLogger('Chaincode --> ');
        let mspID = ctx.clientIdentity.getMSPID();
        logger.info('MSPID : ' + mspID);
        //Checking Fire MSP
        if (mspID ==='FireMSP') {
            const exists = await this.fireCertificateExists(ctx, firecertificateid);
            if (exists) {
                throw new Error(`The Fire Department ${firecertificateid} already exists`); } //Fire certificate Details
            const asset = { buildingid, buildingdetails, expirydate,totalarea, buildingheight, category, tankcapacity, nofirepumps, firepumpload, pumproomarea ,status:'Approved'};
            //Fire Certificate Buffer
            const buffer = Buffer.from(JSON.stringify(asset));
            //Updating Fire Certificate Ledger
            await ctx.stub.putState(firecertificateid, buffer);
            let addfireEvent = {Type: 'FireCertificate Creation',Firecertificateid:firecertificateid};
            await ctx.stub.setEvent('addFireEvent', Buffer.from(JSON.stringify(addfireEvent)));
        }
        else {
            logger.info('Users under the following MSP : ' +
                mspID + 'cannot perform this action');
            return ('Users under the following MSP : ' +
                mspID + 'cannot perform this action');
        }

    }

    //Read Fire Certificate
    async readFireCertificate(ctx, firecertificateid) {
        const exists = await this.fireCertificateExists(ctx, firecertificateid);
        //Checking Fire Certificate Exist
        if (!exists) {
            throw new Error(`The Fire Department certificate Number ${firecertificateid} does not exist`);
        }
        //Fetching Fire Certificate Buffer from Ledger
        const buffer = await ctx.stub.getState(firecertificateid);
        //Converting Buffer to string
        const asset = JSON.parse(buffer.toString());
        //Returning Asset
        return asset;
    }

    //Updating Certificate
    async RenewFireCertificate(ctx,firecertificateid,expirydate,status) {
        let logger = shim.newLogger('Chaincode --> ');
        let mspID = ctx.clientIdentity.getMSPID();
        logger.info('MSPID : ' + mspID);
        // Checking MSP
        if (mspID ==='FireMSP') {
            //Checking Fire Certificate Already  Exists
            const exists = await this.fireCertificateExists(ctx, firecertificateid);
            if (!exists) {
                throw new Error(`The Fire Department certificate ${firecertificateid} does not exist`);
            }

            const buffer = await ctx.stub.getState(firecertificateid);
            //Converting Buffer to string
            const firecertificate = JSON.parse(buffer.toString());
            //updating status
            firecertificate.status=status;
            //updating expiry date
            firecertificate.expirydate=expirydate;
            //converting updating details to Buffer
            const newbuffer = Buffer.from(JSON.stringify(firecertificate));
            //Updating Certificate
            await ctx.stub.putState(firecertificateid, newbuffer);
            //Emiting Event
            let addfirerenewEvent = {Type: 'FireCertificate Renewal',Firecertificateid:firecertificateid};
            await ctx.stub.setEvent('FireRenevalEvent', Buffer.from(JSON.stringify(addfirerenewEvent)));
        }
        else {
            logger.info('Users under the following MSP : ' +
                mspID + 'cannot perform this action');
            return ('Users under the following MSP : ' +
                mspID + 'cannot perform this action');
        }
    }

    //ELECTRICITY DEPARTMENT
    //Checking Fire Certificate Existance
    async electricityCertificateExists(ctx, electrictycertificateid) {
        const buffer = await ctx.stub.getState(electrictycertificateid);
        return (!!buffer && buffer.length > 0);
    }



    //Creating Electricity Certificate
    async createElectricityCertificate(ctx, electricitycertificateid, buildingid, buildingdetails, firecertificateid, expirydate,
        totalelectricity, firepumpload, nofirepumps, electricalroomarea, elecbuildingcat) {
        let logger = shim.newLogger('Chaincode --> ');
        let mspID = ctx.clientIdentity.getMSPID();
        logger.info('MSPID : ' + mspID);
        //Checking MSP Identity
        if (mspID ==='ElectricityDepartmentMSP') {
            const fireCertificate = await this.fireCertificateExists(ctx, firecertificateid);
            //Checking Existance of Fire Certificate
            if (!fireCertificate) {
                throw new Error(`The Fire Department Approval ${firecertificateid} does not exists`);
            }
            //Checking Existance of Electricity Certificate
            const electricitycertificate = await this.electricityCertificateExists(ctx, electricitycertificateid);
            if (electricitycertificate) {
                throw new Error(`The Electricity Department Certificate Number ${electricitycertificateid} already exists`);
            }
            //Creating Electricity Certificate
            const asset = {
                buildingid, buildingdetails, firecertificateid, expirydate,
                totalelectricity, firepumpload, nofirepumps, electricalroomarea, elecbuildingcat,status:'Approved'
            };
            //Writing Electricity Certificate on Ledger
            const buffer = Buffer.from(JSON.stringify(asset));
            await ctx.stub.putState(electricitycertificateid, buffer);
            //Emiting Event
            let addElectricityEvent = {Type: 'ElectricityCertificate Creation',ElectricityCertificateid:electricitycertificateid};
            await ctx.stub.setEvent('addelectricityEvent', Buffer.from(JSON.stringify(addElectricityEvent)));
        }
        else {
            logger.info('Users under the following MSP : ' +
                mspID + 'cannot perform this action');
            return ('Users under the following MSP : ' +
                mspID + 'cannot perform this action');
        }

    }
    //To Read Electricity Certificate
    async readElectricityCertificate(ctx, electricitycertificateid) {
        const exists = await this.electricityCertificateExists(ctx, electricitycertificateid);
        //Checking whetther Certificate Exists
        if (!exists) {
            throw new Error(`The Electricity Department certificate Number ${electricitycertificateid} does not exist`);
        }
        const buffer = await ctx.stub.getState(electricitycertificateid);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }
    //Renewing Electricity Certificate
    async RenewElectricityCertificate(ctx, electricitycertificateid, firecertificateid, expirydate,status) {
        let logger = shim.newLogger('Chaincode --> ');
        let mspID = ctx.clientIdentity.getMSPID();
        logger.info('MSPID : ' + mspID);
        //Checking MSP
        if (mspID === 'ElectricityDepartmentMSP') {
            //Checking whether Electricity Certificate Exist
            const exists = await this.electricityCertificateExists(ctx, electricitycertificateid);
            if (!exists) {
                throw new Error(`The Electricity Department certificate ${electricitycertificateid} doesnt exist`);
            }
            //Checking whether Fire Certificate Exist
            const fireCertificate = await this.fireCertificateExists(ctx, firecertificateid);
            if (!fireCertificate) {
                throw new Error(`The Fire Department Approval ${firecertificateid} does not exists`);
            }
            const fireBuffer = await ctx.stub.getState(firecertificateid);
            const fireDetail = JSON.parse(fireBuffer.toString());
            //Checking Whether fire Certificate is renewd or not
            if(fireDetail.status!=='renewed'){
                throw new Error(`The Electricity Department Certificate Number ${electricitycertificateid} cannot be updated since firecertificate doesnt renewed`);
            }
            const buffer = await ctx.stub.getState(electricitycertificateid);
            const eleccertificate = JSON.parse(buffer.toString());
            //Renewing Status
            eleccertificate.expirydate=expirydate;
            eleccertificate.status=status;
            const newbuffer = Buffer.from(JSON.stringify(eleccertificate));
            //Updating Ledger
            await ctx.stub.putState(electricitycertificateid, newbuffer);
            //Emiting Event
            let renewElectricityEvent = {Type: 'Electricity Renewal Certificate ',ElectricityEvent:electricitycertificateid};
            await ctx.stub.setEvent('renewelectricityEvent', Buffer.from(JSON.stringify(renewElectricityEvent)));
        }
        else {
            logger.info('Users under the following MSP : ' +
                mspID + 'cannot perform this action');
            return ('Users under the following MSP : ' +
                mspID + 'cannot perform this action');
        }

    }
    //CORPORATION DEPARTMENT

    //Checking Corporation Certificate Existance
    async tcCertificateExists(ctx, tccertificateid) {
        const buffer = await ctx.stub.getState(tccertificateid);
        return (!!buffer && buffer.length > 0);
    }
    //Creating Corporation Certificate
    async createTcCertificate(ctx, tccertificateid, buildingid, buildingdetails, firecertificateid, electricitycertificateid,expirydate ){
        let logger = shim.newLogger('Chaincode --> ');
        let mspID = ctx.clientIdentity.getMSPID();
        logger.info('MSPID : ' + mspID);
        //Checking MSP Identity
        if (mspID ==='CorporationDepartmentMSP') {
            const firecertificate = await this.fireCertificateExists(ctx, firecertificateid);
            if (!firecertificate) {
                throw new Error(`The Fire Department Approval ${firecertificateid} does not exists`);
            }
            //Checking whether Electricity Certificate Exist
            const electricitycertificate = await this.electricityCertificateExists(ctx, electricitycertificateid);
            if (!electricitycertificate) {
                throw new Error(`The Electricity Department Approval ${electricitycertificateid} does not exists`);
            }
            //Checking whether Corporation Certificate Exist
            const tccertificate = await this.tcCertificateExists(ctx, tccertificateid);
            if (tccertificate) {
                throw new Error(`The Corporation Approval ${tccertificateid} already exists`);
            }
            //Creating Certificate Details
            const asset = { buildingid, buildingdetails, firecertificateid, electricitycertificateid,status:'Approved',
                expirydate };
            const buffer = Buffer.from(JSON.stringify(asset));
            //Writing On ledger
            await ctx.stub.putState(tccertificateid, buffer);
            //Emiting Event
            let createCorporationEvent = {Type: 'Corporationcertificate Creation',Corporationid:tccertificateid};
            await ctx.stub.setEvent('addcorporationEvent', Buffer.from(JSON.stringify(createCorporationEvent)));
        }
        else {
            logger.info('Users under the following MSP : ' +
                mspID + 'cannot perform this action');
            return ('Users under the following MSP : ' +
                mspID + 'cannot perform this action');
        }

    }

    //To Read Corporation NOC Certificate
    async readTcCertificate(ctx, tccertificateid) {
        const exists = await this.tcCertificateExists(ctx, tccertificateid);
        //Checking whetther Corporation NOC Certificate Exists
        if (!exists) {
            throw new Error(`The Corporation certificate Number ${tccertificateid} does not exist`);
        }
        const buffer = await ctx.stub.getState(tccertificateid);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    //To Renew Corporation Certificate
    async  RenewTcCertificate(ctx,tccertificateid, status, electricitycertificateid,firecertificateid,
        expirydate) {
        let logger = shim.newLogger('Chaincode --> ');
        let mspID = ctx.clientIdentity.getMSPID();
        logger.info('MSPID : ' + mspID);
        //Checking MSP
        if (mspID === 'CorporationDepartmentMSP') {
            const exists = await this.tcCertificateExists(ctx, tccertificateid);
            //Checking whetther Corporation Certificate Exists
            if (!exists) {
                throw new Error(`The Tc certificate ${tccertificateid} does not exist`);
            }
            const fireBuffer = await ctx.stub.getState(firecertificateid);
            const fireDetail = JSON.parse(fireBuffer.toString());

            const elecBuffer = await ctx.stub.getState(electricitycertificateid);
            const elecDetail = JSON.parse(elecBuffer.toString());
            //Checking whetther fire and electricity certificate renewed already
            if(fireDetail.status==='renewed' &&  elecDetail.status==='renewed' ){
                const buffer = await ctx.stub.getState(tccertificateid);
                const tccertificate = JSON.parse(buffer.toString());
                //Renewing Status & Expiry Date
                tccertificate.expirydate=expirydate;
                tccertificate.status=status;
                const newbuffer = Buffer.from(JSON.stringify(tccertificate));
                //Updating Ledger
                await ctx.stub.putState(tccertificateid, newbuffer);
                let renewCorporationEvent = {Type: 'Corporationcertificate Renewal',corporationid:tccertificateid};
                //Emiting Event
                await ctx.stub.setEvent('renewcorporationEvent', Buffer.from(JSON.stringify(renewCorporationEvent)));
            }
            else{
                throw new Error(`The Corporation Department Certificate Number ${tccertificateid} cannot be Renewed Before fire and electricity`);
            }
        }

        else {
            logger.info('Users under the following MSP : ' +
                mspID + 'cannot perform this action');
            return ('Users under the following MSP : ' +
                mspID + 'cannot perform this action');
        }
    }


}

module.exports = IsaContract;
