![Heading](/Documents/gif/Heading.png)


# **Problem Statement**
In 2018, a total of 13,099 cases of fire accidents were reported in the country. Each year thousands of people die because of low safety measures or unsafe construction of buildings. Even though there are strict regulations and certifications to ensure the safety of the buildings, corruption, Data tampering & lack of coordination between the departments make it
ineffective in most cases.

## Present State

- In the present scenario the client(the builder) initially submits application for Initial Fire NOC with with building plans and details to start work and after completing the work client submits application for final Fire NOC with as built drawings and details. Each application procedure department conduct inspection and validation.
- After getting final fire NOC clients apply for various department for NOC's like Electricity Board, LPG Department, Pollution Control Board etc.
- After getting all other NOC's clients apply for T.C number from Corporation. Corporation validates all other certification from other departments and issue approval if satisfied.

![Flow](https://res.cloudinary.com/vimals/image/upload/v1616949786/Screenshot_from_2021-03-28_22-11-45_usghv0.png)

## Problem

In the present scenerio there is huge opportunity for clients to utilize the system to bluff the authorities with the help of corruption and less transparency. The possibilities are
- By submitting fake Drawings to each department in favour of department regulation.
- By Providing Fake or tampered certification to each department.
- By Providing Fake Building details to each department.
- By corrupting inspection agents.

![Flow](https://res.cloudinary.com/vimals/image/upload/v1616950007/Screenshot_from_2021-03-28_22-15-14_z39kds.png)

# **Solution**


- Above Problem can be solved by using an decentralized,tamperproof ledger for storing inspection details at each stage of certification.By using a common ledger for building details for all organization can avoid data duplication and avoid inconsistancy of building details.

![Flow](https://res.cloudinary.com/vimals/image/upload/v1616950750/Screenshot_from_2021-03-28_22-27-44_gt3htd.png)

# **Why Hyperledger Fabric ?**

The problem statement can be solved with decentralized ledger of blockchain technology. since building details cannot published on to public blockchain which can create security as well as privacy issues.Channels, Identity management and security layer of Hyperledger Fabric makes it perfect choice for this problem statement.

# **Workflow**

![Flow](https://res.cloudinary.com/vimals/image/upload/v1616951746/Screenshot_from_2021-03-28_22-44-30_i5mtmm.png)

- Client submits application for Fire NOC.

- Fire Department conducts inspection and Submits Inspection data to Isa Chain and issue certificate.

- Client submits application for Electricity NOC.

- Fire Department conducts inspection with fire inspection details on ISA Chain and Submits Electricity Inspection data to Isa Chain and issue certificate.

- Client Submits application for Corporation NOC.

- Corporation Department conducts inspection with fire & electricity inspection details on ISA Chain and Submits corporation inspection data to Isa Chain and issue certificate.

- clients Submit renewal applications at each department after the expiry date of NOC's

- Each Department conducts Inspection and renews certificates on ISA chain.


# Running The Application

## **Prerequisites**

## System Requirements

- Minimum 8GB Ram,i5 processor,40GB Harddisk Space.
- UBUNTU 18.04 or Above.
- Good Internet Connection

## SOFTWARE/PACKAGE REQUIREMENTS.

- Docker version 20.10.5.
- go version go1.13.3.
- ansible 2.9.6.
- jq-1.6
- Node js 10.24.0
- npm 6.14.11
- vscode 1.39.2
- Hyperledger Fabric 1.4 library images
- IBM Blockchain Platform Extension 1.0.39


## INSTALLATION

**Step 1:** Download the repostory using the command:  
```
 git clone "https://gitlab.com/hlf-student-projects/2020-nov-abcd/vimal-suresh/isa-chain.git"
```
**Step 2:** Move to downloaded directory & Install the dependencies on following directories
- /isa-chain/chaincode
- /isa-chain/frontend_isa
- /isa-chain/Backend

by using command: 
```
 npm Install 
```
![Demo](/Documents/gif/startingnetwork.gif)
**Step 3:** Go to /isa-chain/Network and Spin Up the network using the command 
```
 ansible-playbook playbook.yml
```
**Step 4:** Go to /isa-chain/Backend/Client/profile.js and Update wallets & CCP location of different organization with ansible created directory path of wallet & gateways(Avoid Relative path).

![Demo](/Documents/gif/Chaincodedeployment.gif)

**Step 5:** Open /isa-chain/Chaincode in vscode and select IBM Blockchain Extension.

**Step 6:** connect IBM Blockchain Platform Extension to network by selecting add enviroments option under Fabric Enviroments and select ansible created networks and give location /isa-chain/Network and select the network under Fabric  Enviroments.

**Step 7:** Package Chaincode on Vscode by selecting package open project under Smart Contracts.

**Step 9:** Install Chaincode on all peers by selecting install option on Network.

**Step 10:** Instantiate Chaincode on all peers by selecting instantiate option on Network.

![Demo](/Documents/gif/BackendStart.gif)

**Step 11:** Go to /isa-chain/Backend and start Backend server by using command
```
 npm start 
```
![Demo](/Documents/gif/frontendstart.gif)
**Step 12:** Go to /isa-chain/frontend_isa,Rename the file .env.js to .env and start Frontend server by using command
```
 npm start 
```
### Shutting Down
![Flow](/Documents/gif/shutingdown.gif)

**Step 13:** After Using Application to shut down the network go to /isa-chain/Network and  use command 
```
 ansible-playbook --extra-vars state=absent playbook.yml
```
**Step 14:** check for docker images
```
 docker images
```
**Step 15:** clean unwanted docker images
```
 docker rmi <Image ID>
```
**Step 16:** clean unwanted docker images data
```
 docker system prune
```
**Step 17:** clean unwanted docker volume
```
 docker volume prune
```
# **Working Of Application**
![Demo](/Documents/gif/Projectdemo.gif)

## Registering Fire Certificate

- From the welcome Screen Select Fire Department on Navbar

- Select Register Certificate and Enter the inspection details and click submit button.


## Verifying Fire Certificate

- From the welcome Screen Select Fire Department on Navbar.

- Select getcertificate on sidebar and Eter fire certificate number.


## Registering Electricity Certificate

- From the welcome Screen Select Electricity Department on Navbar

- Select Register Certificate and Enter the inspection details and click submit button.

## Verifying Electricity Certificate

- From the welcome Screen Select Electricity Department on Navbar.

- Select getcertificate on sidebar and Enter Electricity certificate number.

## Registering Corporation Certificate

- From the welcome Screen Select Corporation Department on Navbar

- Select Register Certificate and Enter the inspection details and click submit button.

## Verifying Corporation Certificate

- From the welcome Screen Select Corporation Department on Navbar.

- Select getcertificate on sidebar and Enter Corporation certificate number.

## Renew Fire Certificate

- From the welcome Screen Select Fire Department on Navbar

- Select Renew Certificate and Enter the inspection details and click submit button.

## Renew Electricity Certificate

- From the welcome Screen Select Electricity Department on Navbar

- Select Renew Certificate and Enter the inspection details and click submit button.

## Renew Corporation Certificate

- From the welcome Screen Select Corporation Department on Navbar.

- Select Renew Certificate and Enter the inspection details and click submit button.

# **Future Enhancement**

- In this project to reduce the complexity, we are only including three organization i.e., Fire Department, Electricity Board & Corporation Department but it can be expanded to all departments involving in construction industry which can makethe system more powerful and transparency.

- Push Notification service can be implemented to give notifications to clients when the certificates get expired or rejected.
