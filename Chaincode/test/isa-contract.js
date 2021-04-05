// /*
//  * SPDX-License-Identifier: Apache-2.0
//  */

// 'use strict';

// const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
// const { IsaContract } = require('..');
// const winston = require('winston');

// const chai = require('chai');
// const chaiAsPromised = require('chai-as-promised');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');

// chai.should();
// chai.use(chaiAsPromised);
// chai.use(sinonChai);

// class TestContext {

//     constructor() {
//         this.stub = sinon.createStubInstance(ChaincodeStub);
//         this.clientIdentity = sinon.createStubInstance(ClientIdentity);
//         this.logging = {
//             getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
//             setLevel: sinon.stub(),
//         };
//     }

// }

// describe('IsaContract', () => {

//     let contract;
//     let ctx;

//     beforeEach(() => {
//         contract = new IsaContract();
//         ctx = new TestContext();
//Mock Fire Certificate
//         ctx.stub.getState.withArgs('F123').resolves(Buffer.from(JSON.stringify({buildingid:'12',buildingdetails:'vimalbhavan',expirydate:'12-08-2020',totalarea:'234',buildingheight:'36',category:'C',tankcapacity:'45',nofirepumps:'3',firepumpload:'78',pumproomarea:'89',status:'renewed'})));
//Mock Electricity Certificate
//         ctx.stub.getState.withArgs('E123').resolves(Buffer.from(JSON.stringify({buildingid:'12', buildingdetails:'vimalbhavan', firecertificateid:'F123', expirydate:'12-01-2020',totalelectricity:'860', firepumpload:'78', nofirepumps:'3', electricalroomarea:'567', elecbuildingcat:'C',status:'renewed'})));
//Mock Corporation Certificate
//         ctx.stub.getState.withArgs('C123').resolves(Buffer.from(JSON.stringify({buildingid:'12', buildingdetails:'vimalbhavan', electricitycertificateid: 'E123',firecertificateid:'F123', expirydate:'12-01-2020',status:'Approved'})));


//         ctx.clientIdentity={
//             getMSPID:function(){
//                 return'CorporationDepartmentMSP';//FireMSP,//ElectricityDepartmentMSP,//CorporationDepartmentMSP
//             }
//         };
//     });

//     //Test for Checking Existance of Fire Certificate
//     describe('Fire Certificate Exists', () => {

//         it('should return true for a isa', async () => {
//             await contract.fireCertificateExists(ctx, '123').should.eventually.be.true;
//         });

//         it('should return false for a isa that does not exist', async () => {
//             await contract.fireCertificateExists(ctx, '1003').should.eventually.be.false;
//         });

//     });
//     //Test for Checking Creation Of Fire Certificate
//     describe('createfireCertificate', () => {

//         it('should create a fire certificate', async () => {
//             await contract.createfireCertificate(ctx, '123', '12','vimalbhavan','12-08-2020','234','36','C','45','3','78','89');
//             ctx.stub.putState.should.have.been.calledOnceWithExactly('123', Buffer.from(JSON.stringify({buildingid:'12',buildingdetails:'vimalbhavan',expirydate:'12-08-2020',totalarea:'234',buildingheight:'36',category:'C',tankcapacity:'45',nofirepumps:'3',firepumpload:'78',pumproomarea:'89',status:'Approved'})));
//         });
//         it('should throw an error for a isa that already exists', async () => {
//             await contract.createfireCertificate(ctx,'123', '12','vimalbhavan','12-08-2020','234','36','C','45','3','78','89').should.be.rejectedWith('The Fire Department 123 already exists');
//         });

//     });
//     //Test for Checking Fire certificate Details
//     describe('#Read Fire Certificate', () => {

//         it('should return Fire Certificate', async () => {
//             await contract.readFireCertificate(ctx, '123').should.eventually.deep.equal(({buildingid:'12',buildingdetails:'vimalbhavan',expirydate:'12-08-2020',totalarea:'234',buildingheight:'36',category:'C',tankcapacity:'45',nofirepumps:'3',firepumpload:'78',pumproomarea:'89',status:'Approved'}));
//         });

//         it('should throw an error for fire certificate that does not exist', async () => {
//             await contract.readFireCertificate(ctx, '1003').should.be.rejectedWith('The Fire Department certificate Number 1003 does not exist');
//         });

//     });
//     //Test for Checking Renewal of Fire certificate
//     describe('Renew Fire Certificate Isa', () => {

//         it('should Renew Fire Certificate', async () => {
//             await contract.RenewFireCertificate(ctx, '123', '12-01-2020','renewed');
//             ctx.stub.putState.should.have.been.calledOnceWithExactly('123',Buffer.from(JSON.stringify({buildingid:'12',buildingdetails:'vimalbhavan',expirydate:'12-01-2020',totalarea:'234',buildingheight:'36',category:'C',tankcapacity:'45',nofirepumps:'3',firepumpload:'78',pumproomarea:'89',status:'renewed'})) );
//         });

//         it('should throw an error for a isa that does not exist', async () => {
//             await contract.RenewFireCertificate(ctx, '1003','12-01-2020','renewed').should.be.rejectedWith('The Fire Department certificate 1003 does not exist');
//         });

//     });

//     //Test for Checking Existance of Electricity Certificate
//     describe('Electricity Certificate Exists', () => {

//         it('should return true for Electricity Certificate Exist', async () => {
//             await contract.electricityCertificateExists(ctx, 'E123').should.eventually.be.true;
//         });

//         it('should return false for Electricity Certificate that does not exist', async () => {
//             await contract.electricityCertificateExists(ctx, '1003').should.eventually.be.false;
//         });

//     });
//     //Test for Checking Creation of Electricity Certificate
//     describe('Create Electricity Certificate ', () => {

//         it('should Create Electricity Certificate', async () => {
//             await contract.createElectricityCertificate(ctx, 'E123','12','vimalbhavan','F123', '12-01-2020','860','78','3','567','C','Approved');
//             ctx.stub.putState.should.have.been.calledOnceWithExactly('E123',Buffer.from(JSON.stringify({buildingid:'12', buildingdetails:'vimalbhavan', firecertificateid:'F123', expirydate:'12-01-2020',
//                 totalelectricity:'860', firepumpload:'78', nofirepumps:'3', electricalroomarea:'567', elecbuildingcat:'C',status:'Approved'})) );
//         });

//         it('should throw an error for a Fire Approval that does not exist for Electricity NOC Registration', async () => {
//             await contract.createElectricityCertificate(ctx,'E123','12','vimalbhavan','F122', '12-01-2020','860','78','3','567','C','Approved').should.be.rejectedWith('The Fire Department Approval F122 does not exists');
//         });

//     });
//     //Test for Checking Details of Electricity Certificate
//     describe('#Read Electricity Certificate', () => {

//         it('should return a Electricity Certificate', async () => {
//             await contract.readElectricityCertificate(ctx, 'E123').should.eventually.deep.equal(({buildingid:'12', buildingdetails:'vimalbhavan', firecertificateid:'F123', expirydate:'12-01-2020',
//                 totalelectricity:'860', firepumpload:'78', nofirepumps:'3', electricalroomarea:'567', elecbuildingcat:'C',status:'Approved'}));
//         });

//         it('should throw an error for Electricity Certificate that does not exist', async () => {
//             await contract.readElectricityCertificate(ctx, '1003').should.be.rejectedWith('The Electricity Department certificate Number 1003 does not exist');
//         });

//     });
//     //Test for Renewal of Electricity Certificate
//     describe('Renew Electrical Certificate Isa', () => {

//         it('should Renew Fire Certificate', async () => {
//             await contract.RenewElectricityCertificate(ctx, 'E123','F123', '12-01-2020','renewed');
//             ctx.stub.putState.should.have.been.calledOnceWithExactly('E123',Buffer.from(JSON.stringify({buildingid:'12', buildingdetails:'vimalbhavan', firecertificateid:'F123', expirydate:'12-01-2020',totalelectricity:'860', firepumpload:'78', nofirepumps:'3', electricalroomarea:'567', elecbuildingcat:'C',status:'renewed'})) );
//         });

//         it('should throw an error for Electricity certificate renewal that Fire Certificate does not Renewed', async () => {
//             await contract.RenewElectricityCertificate(ctx,'E123','F123', '12-01-2020','renewed').should.be.rejectedWith('The Electricity Department Certificate Number E123 cannot be updated since firecertificate doesnt renewed');
//         });

//     });

//     //Test for Checking Existance of Corporation Certificate
//     describe('Corporation Certificate Exists', () => {

//         it('should return true for a Electrcity Certificate', async () => {
//             await contract.electricityCertificateExists(ctx, 'C123').should.eventually.be.true;
//         });

//         it('should return false for Electricity Certificate that does not exist', async () => {
//             await contract.electricityCertificateExists(ctx, '1003').should.eventually.be.false;
//         });
//     });
//     //Test for Checking Creation of Corporation Certificate
//     describe('Create Corporation Certificate ', () => {

//         it('should Create Corporation Certificate', async () => {
//             await contract.createTcCertificate(ctx, 'C123','12','vimalbhavan','F123','E123','12-01-2020');
//             ctx.stub.putState.should.have.been.calledOnceWithExactly('C123',Buffer.from(JSON.stringify({buildingid:'12', buildingdetails:'vimalbhavan', firecertificateid:'F123', electricitycertificateid:'E123',status:'Approved', expirydate:'12-01-2020'})) );
//         });

//         it('should throw an error for a Fire Approval that does not exist for T.C NOC Registration', async () => {
//             await contract.createTcCertificate(ctx,'C123','12','vimalbhavan','F122','E123','12-01-2020').should.be.rejectedWith('The Fire Department Approval F122 does not exists');
//         });

//         it('should throw an error for a Electricity Approval that does not exist for T.C NOC Registration', async () => {
//             await contract.createTcCertificate(ctx,'C123','12','vimalbhavan','F123','E122','12-01-2020').should.be.rejectedWith('The Electricity Department Approval E122 does not exists');
//         });


//     });
//     //Test for Checking Details of Corporation Certificate
//     describe('#Read Corporation Certificate', () => {

//         it('should return a Corporation Certificate', async () => {
//             await contract.readElectricityCertificate(ctx, 'C123').should.eventually.deep.equal(({buildingid:'12', buildingdetails:'vimalbhavan', firecertificateid:'F123', electricitycertificateid:'E123',status:'Approved', expirydate:'12-01-2020'}));
//         });

//         it('should throw an error for Corporation Certificate that does not exist', async () => {
//             await contract.readElectricityCertificate(ctx, '1003').should.be.rejectedWith('The Electricity Department certificate Number 1003 does not exist');
//         });

//     });
//     //Test for Checking Renewal of Corporation Certificate
//     describe('Renew Corporation Certificate ', () => {

//         it('should Renew Fire Certificate', async () => {
//             await contract.RenewTcCertificate(ctx, 'C123','renewed','E123','F123', '12-01-2020');
//             ctx.stub.putState.should.have.been.calledOnceWithExactly('C123',Buffer.from(JSON.stringify({buildingid:'12', buildingdetails:'vimalbhavan',  electricitycertificateid:'E123',firecertificateid:'F123', expirydate:'12-01-2020',status:'renewed'})) );
//         });

//         it('should throw an error for Corporation certificate renewal that Fire Certificate does not Renewed', async () => {
//             await contract.RenewTcCertificate(ctx,'E123','F123', '12-01-2020','renewed').should.be.rejectedWith('The Electricity Department Certificate Number E123 cannot be updated since firecertificate doesnt renewed');
//         });

//         it('should throw an error for Corporation certificate renewal that Electricity Certificate does not Renewed', async () => {
//             await contract.RenewTcCertificate(ctx,'E123','F123', '12-01-2020','renewed').should.be.rejectedWith('The Electricity Department Certificate Number E123 cannot be updated since firecertificate doesnt renewed');
//         });

//     });

// });