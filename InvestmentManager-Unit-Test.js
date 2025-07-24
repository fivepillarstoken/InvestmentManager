const {
time,
loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const pancakeSwapRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

describe("InvestmentManager", function () {
    async function deployFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount, treasury, treasury2] = await ethers.getSigners();

        const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
        const startTime = (await time.latest()) + ONE_YEAR_IN_SECS;

        const dexRouter = await ethers.getContractAt("IPancakeRouter02", pancakeSwapRouterAddress);

        const Token = await ethers.getContractFactory("FivePillarsToken");
        const token = await Token.deploy(
            owner.address
        );
        const InvestManager = await ethers.getContractFactory("InvestmentManager");
        const investManager = await InvestManager.deploy(owner.address, startTime, treasury.address, treasury2.address, pancakeSwapRouterAddress, await token.getAddress());

        await token.setInvestmentManager(await investManager.getAddress());

        return { 
            token,
            owner,
            otherAccount,
            treasury,
            treasury2,
            investManager,
            dexRouter,
            startTime
        };
    }

    async function deployFixtureWithMaxRefsCount() {
        // Contracts are deployed using the first signer/account by default
        const [
            owner,
            account1,
            account2,
            account3,
            account4,
            account5,
            account6,
            account7,
            account8,
            account9,
            account10,
            account11,
            treasury,
            treasury2
        ] = await ethers.getSigners();

        const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
        const startTime = (await time.latest()) + ONE_YEAR_IN_SECS;

        const dexRouter = await ethers.getContractAt("IPancakeRouter02", pancakeSwapRouterAddress);

        const Token = await ethers.getContractFactory("FivePillarsToken");
        const token = await Token.deploy(
            owner.address
        );
        const InvestManager = await ethers.getContractFactory("InvestmentManager");
        const investManager = await InvestManager.deploy(owner.address, startTime, treasury.address, treasury2.address, pancakeSwapRouterAddress, await token.getAddress());

        await token.setInvestmentManager(await investManager.getAddress());

        await investManager.setDepositFee(0);
        await investManager.setClaimFee(0);

        const depositAmount = ethers.parseEther("1");
        await token.transfer(account1.address, depositAmount);
        await token.transfer(account2.address, depositAmount);
        await token.transfer(account3.address, depositAmount);
        await token.transfer(account4.address, depositAmount);
        await token.transfer(account5.address, depositAmount);
        await token.transfer(account6.address, depositAmount);
        await token.transfer(account7.address, depositAmount);
        await token.transfer(account8.address, depositAmount);
        await token.transfer(account9.address, depositAmount);
        await token.transfer(account10.address, depositAmount);
        await token.transfer(account11.address, depositAmount);
        await token.connect(owner).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account1).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account2).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account3).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account4).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account5).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account6).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account7).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account8).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account9).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account10).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account11).approve(await investManager.getAddress(), depositAmount);

        await time.increaseTo(startTime);

        await investManager.deposit(depositAmount, ethers.ZeroAddress);
        await investManager.connect(account1).deposit(depositAmount, owner.address);
        await investManager.connect(account2).deposit(depositAmount, account1.address);
        await investManager.connect(account3).deposit(depositAmount, account2.address);
        await investManager.connect(account4).deposit(depositAmount, account3.address);
        await investManager.connect(account5).deposit(depositAmount, account4.address);
        await investManager.connect(account6).deposit(depositAmount, account5.address);
        await investManager.connect(account7).deposit(depositAmount, account6.address);
        await investManager.connect(account8).deposit(depositAmount, account7.address);
        await investManager.connect(account9).deposit(depositAmount, account8.address);
        await investManager.connect(account10).deposit(depositAmount, account9.address);
        await investManager.connect(account11).deposit(depositAmount, account10.address);

        return { 
            token,
            owner,
            account1,
            account2,
            account3,
            account4,
            account5,
            account6,
            account7,
            account8,
            account9,
            account10,
            account11,
            treasury,
            treasury2,
            investManager,
            dexRouter,
            startTime
        };
    }

    async function deployFixtureWithRefsAndThreeActivePools() {
        // Contracts are deployed using the first signer/account by default
        const [
            owner,
            account1,
            account2,
            account3,
            account4,
            account5,
            account6,
            account7,
            account8,
            account9,
            account10,
            account11,
            treasury,
            treasury2
        ] = await ethers.getSigners();

        const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
        const startTime = (await time.latest()) + ONE_YEAR_IN_SECS;

        const dexRouter = await ethers.getContractAt("IPancakeRouter02", pancakeSwapRouterAddress);

        const Token = await ethers.getContractFactory("FivePillarsToken");
        const token = await Token.deploy(
            owner.address
        );
        const InvestManager = await ethers.getContractFactory("InvestmentManager");
        const investManager = await InvestManager.deploy(owner.address, startTime, treasury.address, treasury2.address, pancakeSwapRouterAddress, await token.getAddress());

        await token.setInvestmentManager(await investManager.getAddress());

        await investManager.setDepositFee(0);
        await investManager.setClaimFee(0);

        const depositAmount = ethers.parseEther("10");
        await token.transfer(account1.address, ethers.parseEther("1200000"));
        await token.transfer(account2.address, ethers.parseEther("1200000"));
        await token.transfer(account3.address, ethers.parseEther("1200000"));
        await token.transfer(account4.address, ethers.parseEther("1200000"));
        await token.transfer(account5.address, ethers.parseEther("1200000"));
        await token.transfer(account6.address, depositAmount);
        await token.transfer(account7.address, depositAmount);
        await token.transfer(account8.address, depositAmount);
        await token.transfer(account9.address, depositAmount);
        await token.transfer(account10.address, depositAmount);
        await token.transfer(account11.address, depositAmount);
        await token.connect(owner).approve(await investManager.getAddress(), ethers.parseEther("3000000"));
        await token.connect(account1).approve(await investManager.getAddress(), ethers.parseEther("1200000"));
        await token.connect(account2).approve(await investManager.getAddress(), ethers.parseEther("1200000"));
        await token.connect(account3).approve(await investManager.getAddress(), ethers.parseEther("1200000"));
        await token.connect(account4).approve(await investManager.getAddress(), ethers.parseEther("1200000"));
        await token.connect(account5).approve(await investManager.getAddress(), ethers.parseEther("1200000"));
        await token.connect(account6).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account7).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account8).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account9).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account10).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account11).approve(await investManager.getAddress(), depositAmount);

        await time.increaseTo(startTime);

        await investManager.deposit(ethers.parseEther("3000000"), ethers.ZeroAddress);
        await investManager.connect(account1).deposit(ethers.parseEther("1200000"), owner.address);
        await investManager.connect(account2).deposit(ethers.parseEther("1200000"), owner.address);
        await investManager.connect(account3).deposit(ethers.parseEther("1200000"), owner.address);
        await investManager.connect(account4).deposit(ethers.parseEther("1200000"), owner.address);
        await investManager.connect(account5).deposit(ethers.parseEther("1200000"), owner.address);
        await investManager.connect(account6).deposit(depositAmount, account5.address);
        await investManager.connect(account7).deposit(depositAmount, account5.address);
        await investManager.connect(account8).deposit(depositAmount, account2.address);
        await investManager.connect(account9).deposit(depositAmount, account2.address);
        await investManager.connect(account10).deposit(depositAmount, account9.address);
        await investManager.connect(account11).deposit(depositAmount, account10.address);

        return { 
            token,
            owner,
            account1,
            account2,
            account3,
            account4,
            account5,
            account6,
            account7,
            account8,
            account9,
            account10,
            account11,
            treasury,
            treasury2,
            investManager,
            dexRouter,
            startTime
        };
    }

    async function deployFixtureWithRefsAndActivePools() {
        // Contracts are deployed using the first signer/account by default
        const [
            owner,
            account1,
            account2,
            account3,
            account4,
            account5,
            account6,
            account7,
            account8,
            account9,
            account10,
            account11,
            treasury,
            treasury2
        ] = await ethers.getSigners();

        const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
        const startTime = (await time.latest()) + ONE_YEAR_IN_SECS;

        const dexRouter = await ethers.getContractAt("IPancakeRouter02", pancakeSwapRouterAddress);

        const Token = await ethers.getContractFactory("FivePillarsToken");
        const token = await Token.deploy(
            owner.address
        );
        const InvestManager = await ethers.getContractFactory("InvestmentManager");
        const investManager = await InvestManager.deploy(owner.address, startTime, treasury.address, treasury2.address, pancakeSwapRouterAddress, await token.getAddress());

        await token.setInvestmentManager(await investManager.getAddress());

        await investManager.setDepositFee(0);
        await investManager.setClaimFee(0);

        const depositAmount = ethers.parseEther("10");
        await token.transfer(account1.address, ethers.parseEther("1200000"));
        await token.transfer(account2.address, ethers.parseEther("1200000"));
        await token.transfer(account3.address, ethers.parseEther("1200000"));
        await token.transfer(account4.address, ethers.parseEther("1200000"));
        await token.transfer(account5.address, ethers.parseEther("1200000"));
        await token.transfer(account6.address, depositAmount);
        await token.transfer(account7.address, depositAmount);
        await token.transfer(account8.address, depositAmount);
        await token.transfer(account9.address, depositAmount);
        await token.transfer(account10.address, depositAmount);
        await token.transfer(account11.address, depositAmount);
        await token.connect(owner).approve(await investManager.getAddress(), ethers.parseEther("3000000"));
        await token.connect(account1).approve(await investManager.getAddress(), ethers.parseEther("1200000"));
        await token.connect(account2).approve(await investManager.getAddress(), ethers.parseEther("1200000"));
        await token.connect(account3).approve(await investManager.getAddress(), ethers.parseEther("1200000"));
        await token.connect(account4).approve(await investManager.getAddress(), ethers.parseEther("1200000"));
        await token.connect(account5).approve(await investManager.getAddress(), ethers.parseEther("1200000"));
        await token.connect(account6).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account7).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account8).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account9).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account10).approve(await investManager.getAddress(), depositAmount);
        await token.connect(account11).approve(await investManager.getAddress(), depositAmount);

        await time.increaseTo(startTime);

        await investManager.setWhitelist(owner.address, 7, true);
        await investManager.setWhitelist(owner.address, 8, true);
        await investManager.deposit(ethers.parseEther("3000000"), ethers.ZeroAddress);
        await investManager.connect(account1).deposit(ethers.parseEther("1200000"), owner.address);
        await investManager.connect(account2).deposit(ethers.parseEther("1200000"), owner.address);
        await investManager.connect(account3).deposit(ethers.parseEther("1200000"), owner.address);
        await investManager.connect(account4).deposit(ethers.parseEther("1200000"), owner.address);
        await investManager.connect(account5).deposit(ethers.parseEther("1200000"), owner.address);
        await investManager.connect(account6).deposit(depositAmount, account5.address);
        await investManager.connect(account7).deposit(depositAmount, account5.address);
        await investManager.connect(account8).deposit(depositAmount, account2.address);
        await investManager.connect(account9).deposit(depositAmount, account2.address);
        await investManager.connect(account10).deposit(depositAmount, account9.address);
        await investManager.connect(account11).deposit(depositAmount, account10.address);

        return { 
            token,
            owner,
            account1,
            account2,
            account3,
            account4,
            account5,
            account6,
            account7,
            account8,
            account9,
            account10,
            account11,
            treasury,
            treasury2,
            investManager,
            dexRouter,
            startTime
        };
    }

    describe("Deployment", function () {
        it("Should set the right arguments", async function () {
            const { investManager, startTime, treasury, treasury2, token } = await loadFixture(deployFixture);

            expect(await investManager.startTimestamp()).to.be.equal(startTime);
            expect(await investManager.roundDuration()).to.be.equal(60 * 60 * 24);
            expect(await investManager.depositDelay()).to.be.equal(60 * 60 * 96);
            expect(await investManager.poolCriteriaUpdateDelay()).to.be.equal(60 * 60 * 24 * 30);
            expect(await investManager.lastUpdatePoolCriteriaTimestamp()).to.be.equal(0);
            expect(await investManager.lastUpdatePoolRewardTimestamp()).to.be.equal(startTime);
            expect(await investManager.depositFeeInBp()).to.be.equal(1000000);
            expect(await investManager.claimFeeInBp()).to.be.equal(1000000);
            expect(await investManager.BASIS_POINTS()).to.be.equal(10000000);
            expect(await investManager.treasury()).to.be.equal(treasury.address);
            expect(await investManager.treasury2()).to.be.equal(treasury2.address);
            expect(await investManager.dexRouter()).to.be.equal(pancakeSwapRouterAddress);
            expect(await investManager.fivePillarsToken()).to.be.equal(await token.getAddress());
        });

        it("Should set the right pools info", async function () {
            const { investManager } = await loadFixture(deployFixture);

            const pool1 = await investManager.pools(0);
            const pool2 = await investManager.pools(1);
            const pool3 = await investManager.pools(2);
            const pool4 = await investManager.pools(3);
            const pool5 = await investManager.pools(4);
            const pool6 = await investManager.pools(5);
            const pool7 = await investManager.pools(6);
            const pool8 = await investManager.pools(7);
            const pool9 = await investManager.pools(8);

            expect(pool1[0]).to.be.equal(false);
            expect(pool1[1]).to.be.equal(0);
            expect(pool1[2]).to.be.equal(0);
            expect(pool1[3]).to.be.equal(0);
            expect(pool1[4]).to.be.equal(0);
            expect(pool1[5]).to.be.equal(ethers.parseEther("550000"));
            expect(pool1[6]).to.be.equal(ethers.parseEther("550000"));
            expect(pool1[7]).to.be.equal(1);
            expect(pool1[8]).to.be.equal(1750);

            expect(pool2[0]).to.be.equal(false);
            expect(pool2[1]).to.be.equal(0);
            expect(pool2[2]).to.be.equal(0);
            expect(pool2[3]).to.be.equal(0);
            expect(pool2[4]).to.be.equal(0);
            expect(pool2[5]).to.be.equal(ethers.parseEther("1450000"));
            expect(pool2[6]).to.be.equal(ethers.parseEther("1450000"));
            expect(pool2[7]).to.be.equal(3);
            expect(pool2[8]).to.be.equal(1750);

            expect(pool3[0]).to.be.equal(false);
            expect(pool3[1]).to.be.equal(0);
            expect(pool3[2]).to.be.equal(0);
            expect(pool3[3]).to.be.equal(0);
            expect(pool3[4]).to.be.equal(0);
            expect(pool3[5]).to.be.equal(ethers.parseEther("3000000"));
            expect(pool3[6]).to.be.equal(ethers.parseEther("6000000"));
            expect(pool3[7]).to.be.equal(5);
            expect(pool3[8]).to.be.equal(1750);

            expect(pool4[0]).to.be.equal(false);
            expect(pool4[1]).to.be.equal(0);
            expect(pool4[2]).to.be.equal(0);
            expect(pool4[3]).to.be.equal(0);
            expect(pool4[4]).to.be.equal(0);
            expect(pool4[5]).to.be.equal(ethers.parseEther("5500000"));
            expect(pool4[6]).to.be.equal(ethers.parseEther("11000000"));
            expect(pool4[7]).to.be.equal(10);
            expect(pool4[8]).to.be.equal(1750);

            expect(pool5[0]).to.be.equal(false);
            expect(pool5[1]).to.be.equal(0);
            expect(pool5[2]).to.be.equal(0);
            expect(pool5[3]).to.be.equal(0);
            expect(pool5[4]).to.be.equal(0);
            expect(pool5[5]).to.be.equal(ethers.parseEther("14250000"));
            expect(pool5[6]).to.be.equal(ethers.parseEther("28500000"));
            expect(pool5[7]).to.be.equal(15);
            expect(pool5[8]).to.be.equal(1750);

            expect(pool6[0]).to.be.equal(false);
            expect(pool6[1]).to.be.equal(0);
            expect(pool6[2]).to.be.equal(0);
            expect(pool6[3]).to.be.equal(0);
            expect(pool6[4]).to.be.equal(0);
            expect(pool6[5]).to.be.equal(ethers.parseEther("28500000"));
            expect(pool6[6]).to.be.equal(ethers.parseEther("85500000"));
            expect(pool6[7]).to.be.equal(20);
            expect(pool6[8]).to.be.equal(1000);

            expect(pool7[0]).to.be.equal(false);
            expect(pool7[1]).to.be.equal(0);
            expect(pool7[2]).to.be.equal(0);
            expect(pool7[3]).to.be.equal(0);
            expect(pool7[4]).to.be.equal(0);
            expect(pool7[5]).to.be.equal(ethers.parseEther("57000000"));
            expect(pool7[6]).to.be.equal(ethers.parseEther("171000000"));
            expect(pool7[7]).to.be.equal(20);
            expect(pool7[8]).to.be.equal(1000);

            expect(pool8[0]).to.be.equal(false);
            expect(pool8[1]).to.be.equal(0);
            expect(pool8[2]).to.be.equal(0);
            expect(pool8[3]).to.be.equal(0);
            expect(pool8[4]).to.be.equal(0);
            expect(pool8[5]).to.be.equal(0);
            expect(pool8[6]).to.be.equal(0);
            expect(pool8[7]).to.be.equal(0);
            expect(pool8[8]).to.be.equal(1000);

            expect(pool9[0]).to.be.equal(false);
            expect(pool9[1]).to.be.equal(0);
            expect(pool9[2]).to.be.equal(0);
            expect(pool9[3]).to.be.equal(0);
            expect(pool9[4]).to.be.equal(0);
            expect(pool9[5]).to.be.equal(0);
            expect(pool9[6]).to.be.equal(0);
            expect(pool9[7]).to.be.equal(0);
            expect(pool9[8]).to.be.equal(1000);
        });

        it("Should set the right owner", async function () {
            const { investManager, owner } = await loadFixture(deployFixture);

            expect(await investManager.owner()).to.be.equal(owner.address);
        });

        it("Should revert deploy with invalid start time", async function () {
            const { treasury, treasury2, token, owner } = await loadFixture(deployFixture);

            const startTime = await time.latest();

            const InvestManager = await ethers.getContractFactory("InvestmentManager");
            await expect(InvestManager.deploy(
                owner.address,
                startTime,
                treasury.address,
                treasury2.address,
                pancakeSwapRouterAddress,
                await token.getAddress()
            )).to.be.revertedWithCustomError(InvestManager, "InvalidStartTime");
        });

        it("Should revert deploy with invalid address", async function () {
            const { treasury, treasury2, token, owner } = await loadFixture(deployFixture);

            const startTime = (await time.latest()) + 10;

            const InvestManager = await ethers.getContractFactory("InvestmentManager");
            await expect(InvestManager.deploy(
                owner.address,
                startTime,
                ethers.ZeroAddress,
                treasury2.address,
                pancakeSwapRouterAddress,
                await token.getAddress()
            )).to.be.revertedWithCustomError(InvestManager, "ZeroAddress");

            await expect(InvestManager.deploy(
                owner.address,
                startTime,
                treasury.address,
                ethers.ZeroAddress,
                pancakeSwapRouterAddress,
                await token.getAddress()
            )).to.be.revertedWithCustomError(InvestManager, "ZeroAddress");

            await expect(InvestManager.deploy(
                owner.address,
                startTime,
                treasury.address,
                treasury2.address,
                ethers.ZeroAddress,
                await token.getAddress()
            )).to.be.revertedWithCustomError(InvestManager, "ZeroAddress");

            await expect(InvestManager.deploy(
                owner.address,
                startTime,
                treasury.address,
                treasury2.address,
                pancakeSwapRouterAddress,
                ethers.ZeroAddress
            )).to.be.revertedWithCustomError(InvestManager, "ZeroAddress");
        });
    });

    describe("Main logic", function () {
        describe("Deposit", function () {
            it("Should deposit", async function () {
                const { investManager, token, owner, startTime } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await time.increaseTo(startTime);

                const depositAmount = ethers.parseEther("10");

                await token.approve(await investManager.getAddress(), depositAmount);

                const tokenTotalSupplyBefore = await token.totalSupply();
                expect(await investManager.totalDepositAmount()).to.be.equal(0);
                expect(await investManager.getTotalInvestorsCount()).to.be.equal(0);

                await expect(investManager.deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, owner, -depositAmount);

                const tokenTotalSupplyAfter = await token.totalSupply();
                expect(await investManager.totalDepositAmount()).to.be.equal(depositAmount);
                expect(await investManager.getTotalInvestorsCount()).to.be.equal(1);

                expect(tokenTotalSupplyBefore - tokenTotalSupplyAfter).to.be.equal(depositAmount);

                const investorInfo = await investManager.accountToInvestorInfo(owner.address);
                expect(investorInfo[0]).to.be.equal(depositAmount);
                expect(investorInfo[1]).to.be.equal(0);
                expect(investorInfo[2]).to.be.equal(0);
                expect(investorInfo[3]).to.be.equal(0);
                expect(investorInfo[4]).to.be.equal(0);
                expect(investorInfo[5]).to.be.equal(ethers.ZeroAddress);
                expect(investorInfo[6]).to.be.equal(0);
                expect(investorInfo[7]).to.be.equal(0);
                expect(investorInfo[8]).to.be.equal(0);
                // expect(investorInfo[8]).to.be.deep.equal([0,0,0,0,0,0,0]);
                expect(investorInfo[9]).to.be.equal(0);
                expect(investorInfo[10]).to.be.greaterThanOrEqual(startTime);
                expect(investorInfo[11]).to.be.equal(0);
            });

            it("Should deposit and add referer", async function () {
                const { investManager, token, owner, otherAccount, startTime } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await time.increaseTo(startTime);

                const depositAmount = ethers.parseEther("10");

                await token.approve(await investManager.getAddress(), depositAmount);

                const tokenTotalSupplyBefore = await token.totalSupply();

                await expect(investManager.deposit(depositAmount, otherAccount.address)).to.be.changeTokenBalance(token, owner, -depositAmount);

                const tokenTotalSupplyAfter = await token.totalSupply();

                expect(tokenTotalSupplyBefore - tokenTotalSupplyAfter).to.be.equal(depositAmount);

                const ownerInfo = await investManager.accountToInvestorInfo(owner.address);
                expect(ownerInfo[0]).to.be.equal(depositAmount);
                expect(ownerInfo[1]).to.be.equal(0);
                expect(ownerInfo[2]).to.be.equal(0);
                expect(ownerInfo[3]).to.be.equal(0);
                expect(ownerInfo[4]).to.be.equal(0);
                expect(ownerInfo[5]).to.be.equal(otherAccount);
                expect(ownerInfo[6]).to.be.equal(0);
                expect(ownerInfo[7]).to.be.equal(0);
                expect(ownerInfo[8]).to.be.equal(0);
                // expect(ownerInfo[8]).to.be.deep.equal([0,0,0,0,0,0,0]);
                expect(ownerInfo[9]).to.be.equal(0);
                expect(ownerInfo[10]).to.be.greaterThanOrEqual(startTime);
                expect(ownerInfo[11]).to.be.equal(0);

                const otherAccountInfo = await investManager.accountToInvestorInfo(otherAccount.address);
                expect(otherAccountInfo[0]).to.be.equal(0);
                expect(otherAccountInfo[1]).to.be.equal(1);
                expect(otherAccountInfo[2]).to.be.equal(0);
                expect(otherAccountInfo[3]).to.be.equal(depositAmount);
                expect(otherAccountInfo[4]).to.be.equal(0);
                expect(otherAccountInfo[5]).to.be.equal(ethers.ZeroAddress);
                expect(otherAccountInfo[6]).to.be.equal(0);
                expect(otherAccountInfo[7]).to.be.equal(0);
                expect(otherAccountInfo[8]).to.be.equal(0);
                // expect(otherAccountInfo[8]).to.be.deep.equal([0,0,0,0,0,0,0]);
                expect(otherAccountInfo[9]).to.be.equal(0);
                expect(otherAccountInfo[10]).to.be.equal(0);
                expect(otherAccountInfo[11]).to.be.greaterThanOrEqual(startTime);
            });

            it("Should allow not first deposit < 1 5PT", async function () {
                const { investManager, token, owner, otherAccount, startTime } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await time.increaseTo(startTime);
                await token.approve(await investManager.getAddress(), await token.balanceOf(owner.address));
                await investManager.deposit(ethers.parseEther("1"), otherAccount.address);
                await time.increase(await investManager.depositDelay());
                const depositAmount = ethers.parseEther("0.99");

                await expect(investManager.deposit(depositAmount, ethers.ZeroAddress)).to.be.emit(investManager, "Deposit");
            });

            it("Should revert deposit if deposit not yet available", async function () {
                const { investManager, token, owner, startTime } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await time.increaseTo(startTime);
                const depositAmount = ethers.parseEther("10");
                await token.approve(await investManager.getAddress(), await token.balanceOf(owner.address));
                await expect(investManager.deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, owner, -depositAmount);

                const depositTime = BigInt(startTime) + (await investManager.depositDelay()) - BigInt(1);
                await time.increaseTo(depositTime);

                await expect(investManager.deposit(depositAmount, ethers.ZeroAddress)).to.be.revertedWithCustomError(investManager, "DepositNotYetAvailable");
            });

            it("Should revert deposit before start time", async function () {
                const { investManager, token, owner, startTime } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);

                const depositAmount = ethers.parseEther("10");
                await token.approve(await investManager.getAddress(), await token.balanceOf(owner.address));

                await expect(investManager.deposit(depositAmount, ethers.ZeroAddress)).to.be.revertedWithCustomError(investManager, "DepositNotYetAvailable");
            });

            it("Should revert deposit if referer setted a second time", async function () {
                const { investManager, token, owner, otherAccount, startTime } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await time.increaseTo(startTime);
                const depositAmount = ethers.parseEther("10");
                await token.approve(await investManager.getAddress(), await token.balanceOf(owner.address));
                await expect(investManager.deposit(depositAmount, otherAccount.address)).to.be.changeTokenBalance(token, owner, -depositAmount);

                const depositTime = BigInt(startTime) + (await investManager.depositDelay()) + BigInt(10);
                await time.increaseTo(depositTime);

                await expect(investManager.deposit(depositAmount, otherAccount.address)).to.be.revertedWithCustomError(investManager, "RefererAlreadySetted");
            });

            it("Should revert first deposit < 1 5PT", async function () {
                const { investManager, token, owner, otherAccount, startTime } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await time.increaseTo(startTime);
                const depositAmount = ethers.parseEther("0.99");
                await token.approve(await investManager.getAddress(), await token.balanceOf(owner.address));

                await expect(investManager.deposit(depositAmount, otherAccount.address)).to.be.revertedWithCustomError(investManager, "SmallDepositOrClaimAmount");
            });

            it("Should revert deposit if pool criteria in update", async function () {
                const { investManager, owner, token, account2,account8, startTime } = await loadFixture(deployFixtureWithRefsAndThreeActivePools);
                await investManager.setDepositFee(0);

                const depositAmount = ethers.parseEther("540000");
                await token.transfer(account8.address, depositAmount);
                await token.connect(account8).approve(await investManager.getAddress(), depositAmount);

                const depositTime = BigInt(startTime) + (await investManager.depositDelay() + BigInt(100));
                await time.increaseTo(depositTime);

                await expect(investManager.connect(account8).deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, account8, -depositAmount);

                const ownerInfoBefore = await investManager.accountToInvestorInfo(owner.address);
                const account2InfoBefore = await investManager.accountToInvestorInfo(account2.address);
                const account8InfoBefore = await investManager.accountToInvestorInfo(account8.address);
                const poolInfoBefore = await investManager.pools(0);

                expect(account2InfoBefore[0]).to.be.equal(ethers.parseEther("1200000"));
                expect(account2InfoBefore[1]).to.be.equal(2);
                expect(account2InfoBefore[3]).to.be.equal(ethers.parseEther("540020"));
                expect(await investManager.isInvestorInPool(account2.address, 0)).to.be.equal(false);
                expect(await investManager.isInvestorInPool(owner.address, 0)).to.be.equal(true);
                expect(poolInfoBefore[3]).to.be.equal(1);

                await investManager.setPoolCriteria(
                    [
                        0
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("550000"),
                            totalDirectInvestRequired: ethers.parseEther("540000"),
                            directRefsRequired: 1
                        }
                    ],
                    0
                );

                expect(await investManager.isUpdateCriteriaActive()).to.be.equal(true);

                await token.approve(await investManager.getAddress(), depositAmount);
                await expect(investManager.deposit(depositAmount, ethers.ZeroAddress)).to.be.revertedWithCustomError(investManager, "PoolCriteriaUpdateNotEnded");
            });
        });

        describe("Rewards", function () {
            it("Should calc and update daily rewards on deposit", async function () {
                const { investManager, token, owner, startTime } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await investManager.setClaimFee(0);
                const depositAmount = ethers.parseEther("10");
                const lastRewardsBeforeDeposit = await investManager.getLastRoundRewards(owner.address);
                const accumulatedRewardsBeforeDeposit = await investManager.getAccumulatedRewards(owner.address);
                await token.approve(await investManager.getAddress(), await token.balanceOf(owner.address));
                await time.increaseTo(startTime);
                await expect(investManager.deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, owner, -depositAmount);

                const lastRewardsAfterDeposit = await investManager.getLastRoundRewards(owner.address);
                const accumulatedRewardsAfterDeposit = await investManager.getAccumulatedRewards(owner.address);

                const expectedEndedRounds = BigInt(4);
                const endRoundTime = BigInt(startTime) + (await investManager.roundDuration());
                await time.increaseTo(endRoundTime);

                const lastRewardsAfterEndRound = await investManager.getLastRoundRewards(owner.address);
                const accumulatedRewardsAfterEndRound = await investManager.getAccumulatedRewards(owner.address);

                await time.increase((await investManager.roundDuration()) * BigInt(3));

                const lastRewardsAfterSeveralRounds = await investManager.getLastRoundRewards(owner.address);

                const expectedRoundReward = depositAmount * BigInt(30) / BigInt(10000);
                const expectedAccumulatedRewards = expectedRoundReward * expectedEndedRounds;
                const expectedLastReward = depositAmount * BigInt(30) / BigInt(10000);
                expect(await investManager.getAccumulatedRewards(owner.address)).to.be.equal(expectedAccumulatedRewards);
                expect(await accumulatedRewardsBeforeDeposit).to.be.equal(0);
                expect(await accumulatedRewardsAfterDeposit).to.be.equal(0);
                expect(await accumulatedRewardsAfterEndRound).to.be.equal(expectedRoundReward);
                const depositTime = await time.latest();

                await expect(investManager.deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, owner, -depositAmount);

                const lastRewardsAfterSecondDeposit = await investManager.getLastRoundRewards(owner.address);

                await time.increase(await investManager.roundDuration());

                const lastRewardsAfterSecondDepositAndRound = await investManager.getLastRoundRewards(owner.address);

                expect(lastRewardsBeforeDeposit[0]).to.be.equal(0);
                expect(lastRewardsBeforeDeposit[1]).to.be.equal(0);
                expect(lastRewardsBeforeDeposit[2]).to.be.equal(0);
                expect(lastRewardsAfterDeposit[0]).to.be.equal(0);
                expect(lastRewardsAfterDeposit[1]).to.be.equal(0);
                expect(lastRewardsAfterDeposit[2]).to.be.equal(0);
                expect(lastRewardsAfterEndRound[0]).to.be.equal(expectedRoundReward);
                expect(lastRewardsAfterEndRound[1]).to.be.equal(0);
                expect(lastRewardsAfterEndRound[2]).to.be.equal(0);
                expect(lastRewardsAfterSeveralRounds[0]).to.be.equal(expectedRoundReward);
                expect(lastRewardsAfterSeveralRounds[1]).to.be.equal(0);
                expect(lastRewardsAfterSeveralRounds[2]).to.be.equal(0);
                expect(lastRewardsAfterSecondDeposit[0]).to.be.equal(expectedRoundReward);
                expect(lastRewardsAfterSecondDeposit[1]).to.be.equal(0);
                expect(lastRewardsAfterSecondDeposit[2]).to.be.equal(0);
                expect(lastRewardsAfterSecondDepositAndRound[0]).to.be.equal(depositAmount * BigInt(2) * BigInt(30) / BigInt(10000));
                expect(lastRewardsAfterSecondDepositAndRound[1]).to.be.equal(0);
                expect(lastRewardsAfterSecondDepositAndRound[2]).to.be.equal(0);

                const ownerInfo = await investManager.accountToInvestorInfo(owner.address);
                expect(ownerInfo[0]).to.be.equal(depositAmount * BigInt(2));
                expect(ownerInfo[1]).to.be.equal(0);
                expect(ownerInfo[2]).to.be.equal(0);
                expect(ownerInfo[3]).to.be.equal(0);
                expect(ownerInfo[4]).to.be.equal(0);
                expect(ownerInfo[5]).to.be.equal(ethers.ZeroAddress);
                expect(ownerInfo[6]).to.be.equal(expectedLastReward);
                expect(ownerInfo[7]).to.be.equal(0);
                expect(ownerInfo[8]).to.be.equal(expectedAccumulatedRewards);
                // expect(ownerInfo[8]).to.be.deep.equal([0,0,0,0,0,0,0]);
                expect(ownerInfo[9]).to.be.equal(0);
                expect(ownerInfo[10]).to.be.closeTo(depositTime, 1);
                expect(ownerInfo[11]).to.be.equal(0);
            });

            it("Should calc daily rewards with refs and pools", async function () {
                const { investManager, token, owner, account1, account6, startTime } = await loadFixture(deployFixtureWithRefsAndThreeActivePools);

                const lastRewardsAfterDeposit = await investManager.getLastRoundRewards(owner.address);

                const expectedEndedRounds = BigInt(4);
                await time.increase((await investManager.roundDuration()) * expectedEndedRounds);

                const lastRewardsAfterEndRound = await investManager.getLastRoundRewards(owner.address);

                // const depositTime = BigInt(startTime) + (await investManager.depositDelay() + BigInt(100));
                // await time.increaseTo(depositTime);

                const lastRewardsAfterSeveralRounds = await investManager.getLastRoundRewards(owner.address);

                const expectedDailyRewards = (ethers.parseEther("3000000") * BigInt(30) / BigInt(10000));
                const expectedDirectRefRewards = (ethers.parseEther("6000000") * BigInt(25) / BigInt(100000));
                const expectedDownlineRefRewards = (ethers.parseEther("60") * BigInt(675) / BigInt(10000000));
                const expectedPool1Rewards = ethers.parseEther("6000060") * BigInt(175) / BigInt(1000000);
                const expectedPool2Rewards = ethers.parseEther("3600060") * BigInt(175) / BigInt(1000000);
                const expectedPool3Rewards = ethers.parseEther("1200060") * BigInt(175) / BigInt(1000000);
                const expectedAccumulatedRewards = (
                    expectedDailyRewards +
                    expectedDirectRefRewards +
                    expectedDownlineRefRewards +
                    expectedPool1Rewards +
                    expectedPool2Rewards + 
                    expectedPool3Rewards
                ) * expectedEndedRounds;
                expect(await investManager.getAccumulatedRewards(owner.address)).to.be.equal(expectedAccumulatedRewards);

                expect(lastRewardsAfterDeposit[0]).to.be.equal(0);
                expect(lastRewardsAfterDeposit[1]).to.be.equal(0);
                expect(lastRewardsAfterDeposit[2]).to.be.equal(0);
                expect(lastRewardsAfterEndRound[0]).to.be.equal(expectedDailyRewards);
                expect(lastRewardsAfterEndRound[1]).to.be.equal(expectedDirectRefRewards + expectedDownlineRefRewards);
                expect(lastRewardsAfterEndRound[2]).to.be.equal(
                    expectedPool1Rewards +
                    expectedPool2Rewards + 
                    expectedPool3Rewards
                );
                expect(lastRewardsAfterSeveralRounds[0]).to.be.equal(expectedDailyRewards);
                expect(lastRewardsAfterSeveralRounds[1]).to.be.equal(expectedDirectRefRewards + expectedDownlineRefRewards);
                expect(lastRewardsAfterSeveralRounds[2]).to.be.equal(
                    expectedPool1Rewards +
                    expectedPool2Rewards + 
                    expectedPool3Rewards
                );

                const depositAmount = ethers.parseEther("10");
                await token.approve(await investManager.getAddress(), await token.balanceOf(owner.address));
                await expect(investManager.deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, owner, -depositAmount);

                const lastRewardsAfterSecondDeposit = await investManager.getLastRoundRewards(owner.address);

                await time.increase(await investManager.roundDuration());

                const lastRewardsAfterSecondDepositAndRound = await investManager.getLastRoundRewards(owner.address);

                expect(lastRewardsAfterSecondDeposit[0]).to.be.equal(expectedDailyRewards);
                expect(lastRewardsAfterSecondDeposit[1]).to.be.equal(expectedDirectRefRewards + expectedDownlineRefRewards);
                expect(lastRewardsAfterSecondDeposit[2]).to.be.equal(
                    expectedPool1Rewards +
                    expectedPool2Rewards + 
                    expectedPool3Rewards
                );
                expect(lastRewardsAfterSecondDepositAndRound[0]).to.be.equal((ethers.parseEther("3000000") + depositAmount) * BigInt(30) / BigInt(10000));
                expect(lastRewardsAfterSecondDepositAndRound[1]).to.be.equal(expectedDirectRefRewards + expectedDownlineRefRewards);
                expect(lastRewardsAfterSecondDepositAndRound[2]).to.be.equal(
                    ((ethers.parseEther("6000060") + depositAmount) * BigInt(175) / BigInt(1000000)) +
                    ((ethers.parseEther("3600060") + depositAmount) * BigInt(175) / BigInt(1000000)) +
                    ((ethers.parseEther("1200060") + depositAmount) * BigInt(175) / BigInt(1000000))
                );

                await token.transfer(account1.address, depositAmount);
                await token.connect(account1).approve(await investManager.getAddress(), depositAmount);
                await expect(investManager.connect(account1).deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, account1, -depositAmount);

                const lastRewardsAfterDirectReferalDeposit = await investManager.getLastRoundRewards(owner.address);

                await time.increase(await investManager.roundDuration());

                const lastRewardsAfterDirectReferalDepositAndRound = await investManager.getLastRoundRewards(owner.address);

                expect(lastRewardsAfterDirectReferalDeposit[0]).to.be.equal((ethers.parseEther("3000000") + depositAmount) * BigInt(30) / BigInt(10000));
                expect(lastRewardsAfterDirectReferalDeposit[1]).to.be.equal(expectedDirectRefRewards + expectedDownlineRefRewards);
                expect(lastRewardsAfterDirectReferalDeposit[2]).to.be.equal(
                    ((ethers.parseEther("6000060") + depositAmount) * BigInt(175) / BigInt(1000000)) +
                    ((ethers.parseEther("3600060") + depositAmount) * BigInt(175) / BigInt(1000000)) +
                    ((ethers.parseEther("1200060") + depositAmount) * BigInt(175) / BigInt(1000000))
                );
                expect(lastRewardsAfterDirectReferalDepositAndRound[0]).to.be.equal((ethers.parseEther("3000000") + depositAmount) * BigInt(30) / BigInt(10000));
                expect(lastRewardsAfterDirectReferalDepositAndRound[1]).to.be.equal(
                    ((ethers.parseEther("6000000") + depositAmount) * BigInt(25) / BigInt(100000)) +
                    (ethers.parseEther("60") * BigInt(675) / BigInt(10000000))
                );
                expect(lastRewardsAfterDirectReferalDepositAndRound[2]).to.be.equal(
                    ((ethers.parseEther("6000060") + (depositAmount * BigInt(2))) * BigInt(175) / BigInt(1000000)) +
                    ((ethers.parseEther("3600060") + (depositAmount * BigInt(2))) * BigInt(175) / BigInt(1000000)) +
                    ((ethers.parseEther("1200060") + (depositAmount * BigInt(2))) * BigInt(175) / BigInt(1000000))
                );

                await token.transfer(account6.address, depositAmount);
                await token.connect(account6).approve(await investManager.getAddress(), depositAmount);
                await expect(investManager.connect(account6).deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, account6, -depositAmount);

                const lastRewardsAfterDownlineReferalDeposit = await investManager.getLastRoundRewards(owner.address);

                await time.increase(await investManager.roundDuration());

                const lastRewardsAfterDownlineReferalDepositAndRound = await investManager.getLastRoundRewards(owner.address);

                expect(lastRewardsAfterDownlineReferalDeposit[0]).to.be.equal((ethers.parseEther("3000000") + depositAmount) * BigInt(30) / BigInt(10000));
                expect(lastRewardsAfterDownlineReferalDeposit[1]).to.be.equal(
                    ((ethers.parseEther("6000000") + depositAmount) * BigInt(25) / BigInt(100000)) +
                    (ethers.parseEther("60") * BigInt(675) / BigInt(10000000))
                );
                expect(lastRewardsAfterDownlineReferalDeposit[2]).to.be.equal(
                    ((ethers.parseEther("6000060") + (depositAmount * BigInt(2))) * BigInt(175) / BigInt(1000000)) +
                    ((ethers.parseEther("3600060") + (depositAmount * BigInt(2))) * BigInt(175) / BigInt(1000000)) +
                    ((ethers.parseEther("1200060") + (depositAmount * BigInt(2))) * BigInt(175) / BigInt(1000000))
                );
                expect(lastRewardsAfterDownlineReferalDepositAndRound[0]).to.be.equal((ethers.parseEther("3000000") + depositAmount) * BigInt(30) / BigInt(10000));
                expect(lastRewardsAfterDownlineReferalDepositAndRound[1]).to.be.equal(
                    ((ethers.parseEther("6000000") + depositAmount) * BigInt(25) / BigInt(100000)) +
                    ((ethers.parseEther("60") + depositAmount) * BigInt(675) / BigInt(10000000))
                );
                expect(lastRewardsAfterDownlineReferalDepositAndRound[2]).to.be.equal(
                    ((ethers.parseEther("6000060") + (depositAmount * BigInt(3))) * BigInt(175) / BigInt(1000000)) +
                    ((ethers.parseEther("3600060") + (depositAmount * BigInt(3))) * BigInt(175) / BigInt(1000000)) +
                    ((ethers.parseEther("1200060") + (depositAmount * BigInt(3))) * BigInt(175) / BigInt(1000000))
                );

                await time.increase((await investManager.roundDuration()) * BigInt(10));

                const lastRewardsAfterTenRounds = await investManager.getLastRoundRewards(owner.address);

                expect(lastRewardsAfterTenRounds[0]).to.be.equal((ethers.parseEther("3000000") + depositAmount) * BigInt(30) / BigInt(10000));
                expect(lastRewardsAfterTenRounds[1]).to.be.equal(
                    ((ethers.parseEther("6000000") + depositAmount) * BigInt(25) / BigInt(100000)) +
                    ((ethers.parseEther("60") + depositAmount) * BigInt(675) / BigInt(10000000))
                );
                expect(lastRewardsAfterTenRounds[2]).to.be.equal(
                    ((ethers.parseEther("6000060") + (depositAmount * BigInt(3))) * BigInt(175) / BigInt(1000000)) +
                    ((ethers.parseEther("3600060") + (depositAmount * BigInt(3))) * BigInt(175) / BigInt(1000000)) +
                    ((ethers.parseEther("1200060") + (depositAmount * BigInt(3))) * BigInt(175) / BigInt(1000000))
                );
            });

            it("Should claim rewards", async function () {
                const { investManager, token, owner, startTime } = await loadFixture(deployFixtureWithRefsAndThreeActivePools);

                const depositAmount = ethers.parseEther("1");
                await token.approve(await investManager.getAddress(), depositAmount);

                const expectedEndedRounds = BigInt(4);
                const claimTime = BigInt(startTime) + ((await investManager.roundDuration()) * expectedEndedRounds + BigInt(100));
                await time.increaseTo(claimTime);

                const expectedDailyRewards = (ethers.parseEther("3000000") * BigInt(30) / BigInt(10000));
                const expectedDirectRefRewards = (ethers.parseEther("6000000") * BigInt(25) / BigInt(100000));
                const expectedDownlineRefRewards = (ethers.parseEther("60") * BigInt(675) / BigInt(10000000));
                const expectedPool1Rewards = ethers.parseEther("6000060") * BigInt(175) / BigInt(1000000);
                const expectedPool2Rewards = ethers.parseEther("3600060") * BigInt(175) / BigInt(1000000);
                const expectedPool3Rewards = ethers.parseEther("1200060") * BigInt(175) / BigInt(1000000);
                const expectedAccumulatedRewards = (
                    expectedDailyRewards +
                    expectedDirectRefRewards +
                    expectedDownlineRefRewards +
                    expectedPool1Rewards +
                    expectedPool2Rewards + 
                    expectedPool3Rewards
                ) * expectedEndedRounds;
                expect(await investManager.getAccumulatedRewards(owner.address)).to.be.equal(expectedAccumulatedRewards);

                const expectedUserReinvest = expectedAccumulatedRewards * BigInt(50) / BigInt(100);
                const expectedUserReceive = expectedAccumulatedRewards - expectedUserReinvest;

                const ownerInfoBefore = await investManager.accountToInvestorInfo(owner.address);
                const pool1InfoBefore = await investManager.pools(0);
                const pool2InfoBefore = await investManager.pools(1);
                const pool3InfoBefore = await investManager.pools(2);
                const totalDepositBefore = await investManager.totalDepositAmount();

                await expect(investManager.claimReward()).to.be.changeTokenBalance(token, owner, expectedUserReceive);

                expect(await investManager.getAccumulatedRewards(owner.address)).to.be.equal(0);

                const ownerInfo = await investManager.accountToInvestorInfo(owner.address);
                const pool1Info = await investManager.pools(0);
                const pool2Info = await investManager.pools(1);
                const pool3Info = await investManager.pools(2);
                const totalDeposit = await investManager.totalDepositAmount();

                const lastRoundRewards = await investManager.getLastRoundRewards(owner.address);

                expect(lastRoundRewards[0]).to.be.equal(expectedDailyRewards);
                expect(lastRoundRewards[1]).to.be.equal(expectedDirectRefRewards + expectedDownlineRefRewards);
                expect(lastRoundRewards[2]).to.be.equal(expectedPool1Rewards + expectedPool2Rewards + expectedPool3Rewards);
                expect(ownerInfo[6]).to.be.equal(expectedDailyRewards);
                expect(ownerInfo[7]).to.be.equal(expectedDirectRefRewards + expectedDownlineRefRewards);
                expect(ownerInfo[8]).to.be.equal(0);
                expect(ownerInfo[9]).to.be.closeTo(claimTime, 1);
                expect(ownerInfo[10]).to.be.closeTo(startTime, 20);
                expect(ownerInfo[11]).to.be.closeTo(claimTime, 1);
                expect(pool1Info[2]).to.be.equal(expectedPool1Rewards);
                expect(pool2Info[2]).to.be.equal(expectedPool2Rewards);
                expect(pool3Info[2]).to.be.equal(expectedPool3Rewards);
                expect(await investManager.getInvestorPoolRewardPerTokenPaid(owner.address, 0)).to.be.equal(pool1Info[4]);
                expect(await investManager.getInvestorPoolRewardPerTokenPaid(owner.address, 1)).to.be.equal(pool2Info[4]);
                expect(await investManager.getInvestorPoolRewardPerTokenPaid(owner.address, 2)).to.be.equal(pool3Info[4]);
                expect(await investManager.getInvestorPoolRewardPerTokenPaid(owner.address, 3)).to.be.equal(0);
                expect(await investManager.getInvestorPoolRewardPerTokenPaid(owner.address, 4)).to.be.equal(0);
                expect(await investManager.getInvestorPoolRewardPerTokenPaid(owner.address, 5)).to.be.equal(0);
                expect(await investManager.getInvestorPoolRewardPerTokenPaid(owner.address, 6)).to.be.equal(0);

                // Check reinvest
                expect(pool1Info[1]).to.be.equal(pool1InfoBefore[1] + expectedUserReinvest * pool1InfoBefore[8] / (await investManager.BASIS_POINTS()));
                expect(pool2Info[1]).to.be.equal(pool2InfoBefore[1] + expectedUserReinvest * pool2InfoBefore[8] / (await investManager.BASIS_POINTS()));
                expect(pool3Info[1]).to.be.equal(pool3InfoBefore[1] + expectedUserReinvest * pool3InfoBefore[8] / (await investManager.BASIS_POINTS()));
                expect(ownerInfo[0]).to.be.equal(ownerInfoBefore[0] + expectedUserReinvest);
                expect(totalDeposit).to.be.equal(totalDepositBefore + expectedUserReinvest);
            });

            it("Should revert claim < 1 5PT", async function () {
                const { investManager, token, owner, startTime } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await investManager.setClaimFee(0);

                const depositAmount = ethers.parseEther("10");
                await token.approve(await investManager.getAddress(), await token.balanceOf(owner.address));
                await time.increaseTo(startTime);
                await expect(investManager.deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, owner, -depositAmount);

                const expectedEndedRounds = BigInt(4);
                const claimTime = BigInt(startTime) + ((await investManager.roundDuration()) * expectedEndedRounds);
                await time.increaseTo(claimTime);

                const expectedAccumulatedRewards = (depositAmount * BigInt(30) / BigInt(10000)) * expectedEndedRounds;
                expect(await investManager.getAccumulatedRewards(owner.address)).to.be.equal(expectedAccumulatedRewards);

                await expect(investManager.claimReward()).to.be.revertedWithCustomError(investManager, "SmallDepositOrClaimAmount");
            });

            it("Should revert claim reward if pool criteria in update", async function () {
                const { investManager, owner, token, account2,account8, startTime } = await loadFixture(deployFixtureWithRefsAndThreeActivePools);

                const depositAmount = ethers.parseEther("540000");
                await token.transfer(account8.address, depositAmount);
                await token.connect(account8).approve(await investManager.getAddress(), depositAmount);

                const depositTime = BigInt(startTime) + (await investManager.depositDelay() + BigInt(100));
                await time.increaseTo(depositTime);

                await expect(investManager.connect(account8).deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, account8, -depositAmount);

                const ownerInfoBefore = await investManager.accountToInvestorInfo(owner.address);
                const account2InfoBefore = await investManager.accountToInvestorInfo(account2.address);
                const account8InfoBefore = await investManager.accountToInvestorInfo(account8.address);
                const poolInfoBefore = await investManager.pools(0);

                expect(account2InfoBefore[0]).to.be.equal(ethers.parseEther("1200000"));
                expect(account2InfoBefore[1]).to.be.equal(2);
                expect(account2InfoBefore[3]).to.be.equal(ethers.parseEther("540020"));
                expect(await investManager.isInvestorInPool(account2.address, 0)).to.be.equal(false);
                expect(await investManager.isInvestorInPool(owner.address, 0)).to.be.equal(true);
                expect(poolInfoBefore[3]).to.be.equal(1);

                await investManager.setPoolCriteria(
                    [
                        0
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("550000"),
                            totalDirectInvestRequired: ethers.parseEther("540000"),
                            directRefsRequired: 1
                        }
                    ],
                    0
                );

                expect(await investManager.isUpdateCriteriaActive()).to.be.equal(true);

                await expect(investManager.claimReward()).to.be.revertedWithCustomError(investManager, "PoolCriteriaUpdateNotEnded");
            });
        });

        describe("Poos system", function () {
            it("Should activate pool", async function () {
                const { investManager, token, owner, otherAccount, startTime } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await investManager.setClaimFee(0);
    
                const depositAmount = ethers.parseEther("550000");
                await token.transfer(otherAccount.address, depositAmount);
                await token.approve(await investManager.getAddress(), await token.balanceOf(owner.address));
                await token.connect(otherAccount).approve(await investManager.getAddress(), await token.balanceOf(otherAccount.address));
                await time.increaseTo(startTime);
                await investManager.deposit(depositAmount, ethers.ZeroAddress);

                const poolInfoBefore = await investManager.pools(0);
                expect(await investManager.isInvestorInPool(owner.address, 0));

                await expect(investManager.connect(otherAccount).deposit(depositAmount, owner.address)).to.be.not.reverted;

                const poolInfoAfter = await investManager.pools(0);
                expect(await investManager.isInvestorInPool(owner.address, 0));

                const expectedPoolReward = depositAmount * BigInt(175) / BigInt(1000000);

                expect(poolInfoBefore[0]).to.be.equal(false);
                expect(poolInfoBefore[1]).to.be.equal(0);
                expect(poolInfoBefore[2]).to.be.equal(0);
                expect(poolInfoBefore[3]).to.be.equal(0);
                expect(poolInfoBefore[4]).to.be.equal(0);
                expect(poolInfoBefore[5]).to.be.equal(ethers.parseEther("550000"));
                expect(poolInfoBefore[6]).to.be.equal(ethers.parseEther("550000"));
                expect(poolInfoBefore[7]).to.be.equal(1);
                expect(poolInfoBefore[8]).to.be.equal(1750);

                expect(poolInfoAfter[0]).to.be.equal(true);
                expect(poolInfoAfter[1]).to.be.equal(expectedPoolReward);
                expect(poolInfoAfter[2]).to.be.equal(0);
                expect(poolInfoAfter[3]).to.be.equal(1);
                expect(poolInfoAfter[4]).to.be.equal(0);
                expect(poolInfoAfter[5]).to.be.equal(ethers.parseEther("550000"));
                expect(poolInfoAfter[6]).to.be.equal(ethers.parseEther("550000"));
                expect(poolInfoAfter[7]).to.be.equal(1);
                expect(poolInfoAfter[8]).to.be.equal(1750);
            });

            it("Should accumulate share after activating pool", async function () {
                const { 
                    investManager
                } = await loadFixture(deployFixtureWithRefsAndThreeActivePools);
    
                const pool1Info = await investManager.pools(0);
                const pool2Info = await investManager.pools(1);
                const pool3Info = await investManager.pools(2);

                const expectedPool1CurReward = ethers.parseEther("6000060") * BigInt(175) / BigInt(1000000);
                const expectedPool2CurReward = ethers.parseEther("3600060") * BigInt(175) / BigInt(1000000);
                const expectedPool3CurReward = ethers.parseEther("1200060") * BigInt(175) / BigInt(1000000);

                expect(pool1Info[0]).to.be.equal(true);
                expect(pool2Info[0]).to.be.equal(true);
                expect(pool3Info[0]).to.be.equal(true);

                expect(pool1Info[1]).to.be.equal(expectedPool1CurReward);
                expect(pool2Info[1]).to.be.equal(expectedPool2CurReward);
                expect(pool3Info[1]).to.be.equal(expectedPool3CurReward);
            });

            it("Should update pool rewards if round not ended on reinvestment", async function () {
                const { investManager, token, owner, account1, startTime } = await loadFixture(deployFixtureWithRefsAndThreeActivePools);

                const depositAmount = ethers.parseEther("1");
                await token.approve(await investManager.getAddress(), depositAmount);

                const claimTime = BigInt(startTime) + (await investManager.roundDuration() + BigInt(100));
                await time.increaseTo(claimTime);

                await expect(investManager.claimReward()).to.be.not.reverted;

                expect(await investManager.getAccumulatedRewards(owner.address)).to.be.equal(0);

                const pool1Info = await investManager.pools(0);
                const pool2Info = await investManager.pools(1);
                const pool3Info = await investManager.pools(2);
                const accumulatedReward = await investManager.connect(account1).getAccumulatedRewards(account1.address);
                const expectedReinvestAmount = accumulatedReward * BigInt(50) / BigInt(100);

                await expect(investManager.connect(account1).claimReward()).to.be.not.reverted;

                const pool1InfoAfter = await investManager.pools(0);
                const pool2InfoAfter = await investManager.pools(1);
                const pool3InfoAfter = await investManager.pools(2);

                expect(pool1InfoAfter[0]).to.be.equal(pool1Info[0]);
                expect(pool1InfoAfter[1]).to.be.equal(pool1Info[1] + expectedReinvestAmount * pool1Info[8] / (await investManager.BASIS_POINTS()));
                expect(pool1InfoAfter[2]).to.be.equal(pool1Info[2]);
                expect(pool1InfoAfter[3]).to.be.equal(pool1Info[3]);
                expect(pool1InfoAfter[4]).to.be.equal(pool1Info[4]);
                expect(pool1InfoAfter[5]).to.be.equal(pool1Info[5]);
                expect(pool1InfoAfter[6]).to.be.equal(pool1Info[6]);
                expect(pool1InfoAfter[7]).to.be.equal(pool1Info[7]);
                expect(pool1InfoAfter[8]).to.be.equal(pool1Info[8]);

                expect(pool2InfoAfter[0]).to.be.equal(pool2Info[0]);
                expect(pool2InfoAfter[1]).to.be.equal(pool2Info[1] + expectedReinvestAmount * pool2Info[8] / (await investManager.BASIS_POINTS()));
                expect(pool2InfoAfter[2]).to.be.equal(pool2Info[2]);
                expect(pool2InfoAfter[3]).to.be.equal(pool2Info[3]);
                expect(pool2InfoAfter[4]).to.be.equal(pool2Info[4]);
                expect(pool2InfoAfter[5]).to.be.equal(pool2Info[5]);
                expect(pool2InfoAfter[6]).to.be.equal(pool2Info[6]);
                expect(pool2InfoAfter[7]).to.be.equal(pool2Info[7]);
                expect(pool2InfoAfter[8]).to.be.equal(pool2Info[8]);

                expect(pool3InfoAfter[0]).to.be.equal(pool3Info[0]);
                expect(pool3InfoAfter[1]).to.be.equal(pool3Info[1] + expectedReinvestAmount * pool3Info[8] / (await investManager.BASIS_POINTS()));
                expect(pool3InfoAfter[2]).to.be.equal(pool3Info[2]);
                expect(pool3InfoAfter[3]).to.be.equal(pool3Info[3]);
                expect(pool3InfoAfter[4]).to.be.equal(pool3Info[4]);
                expect(pool3InfoAfter[5]).to.be.equal(pool3Info[5]);
                expect(pool3InfoAfter[6]).to.be.equal(pool3Info[6]);
                expect(pool3InfoAfter[7]).to.be.equal(pool3Info[7]);
                expect(pool3InfoAfter[8]).to.be.equal(pool3Info[8]);
            });

            it("Should correct distribute pool rewards", async function () {
                const { investManager, owner, token, account2,account8, startTime } = await loadFixture(deployFixtureWithRefsAndThreeActivePools);

                const depositAmount = ethers.parseEther("550000");
                await token.transfer(account8.address, depositAmount);
                await token.connect(account8).approve(await investManager.getAddress(), depositAmount);
                const expectedEndedRoundsBeforeDeposit = BigInt(4);
                const expectedEndedRoundsAfterDeposit = BigInt(4);

                await time.increaseTo(BigInt(startTime) + ((await investManager.roundDuration()) * expectedEndedRoundsBeforeDeposit + BigInt(15)));

                await expect(investManager.connect(account8).deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, account8, -depositAmount);

                await time.increaseTo(BigInt(startTime) + ((await investManager.roundDuration()) * expectedEndedRoundsAfterDeposit * BigInt(2)));

                const expectedOwnerDailyRewards = (ethers.parseEther("3000000") * BigInt(30) / BigInt(10000));
                const expectedAccount2DailyRewards = (ethers.parseEther("1200000") * BigInt(30) / BigInt(10000));
                const expectedOwnerDirectRefRewards = (ethers.parseEther("6000000") * BigInt(25) / BigInt(100000));
                const expectedAccount2DirectRefRewardsBefore = (ethers.parseEther("20") * BigInt(25) / BigInt(100000));
                const expectedAccount2DirectRefRewards = (ethers.parseEther("550020") * BigInt(25) / BigInt(100000));
                const expectedOwnerDownlineRefRewardsBefore = (ethers.parseEther("60") * BigInt(675) / BigInt(10000000));
                const expectedOwnerDownlineRefRewards = (ethers.parseEther("550060") * BigInt(675) / BigInt(10000000));
                const expectedPool1Rewards = ethers.parseEther("6000060") * BigInt(175) / BigInt(1000000);
                const expectedPool2Rewards = ethers.parseEther("3600060") * BigInt(175) / BigInt(1000000);
                const expectedPool3Rewards = ethers.parseEther("1200060") * BigInt(175) / BigInt(1000000);
                const expectedPool1RewardsAfter = ethers.parseEther("6550060") * BigInt(175) / BigInt(1000000);
                const expectedPool2RewardsAfter = ethers.parseEther("4150060") * BigInt(175) / BigInt(1000000);
                const expectedPool3RewardsAfter = ethers.parseEther("1750060") * BigInt(175) / BigInt(1000000);
                const expectedOwnerAccumulatedRewards = (
                    expectedOwnerDailyRewards +
                    expectedOwnerDirectRefRewards +
                    expectedOwnerDownlineRefRewardsBefore +
                    expectedPool1Rewards +
                    expectedPool2Rewards + 
                    expectedPool3Rewards
                ) * expectedEndedRoundsBeforeDeposit + (
                    expectedOwnerDailyRewards +
                    expectedOwnerDirectRefRewards +
                    expectedOwnerDownlineRefRewards +
                    expectedPool1RewardsAfter / BigInt(2) +
                    expectedPool2RewardsAfter +
                    expectedPool3RewardsAfter
                ) * expectedEndedRoundsAfterDeposit;
                const expectedAccount2AccumulatedRewards = (
                    expectedAccount2DailyRewards +
                    expectedAccount2DirectRefRewardsBefore
                ) * expectedEndedRoundsBeforeDeposit + (
                    expectedAccount2DailyRewards +
                    expectedAccount2DirectRefRewards +
                    expectedPool1RewardsAfter / BigInt(2)
                ) * expectedEndedRoundsAfterDeposit;
                expect(await investManager.getAccumulatedRewards(owner.address)).to.be.equal(expectedOwnerAccumulatedRewards);
                expect(await investManager.connect(account2).getAccumulatedRewards(account2.address)).to.be.equal(expectedAccount2AccumulatedRewards);
            });

            describe("Whitelist pools", function () {
                it("Should activate whitelist pools and add investor in pools", async function () {
                    const { investManager, token, owner, otherAccount, startTime } = await loadFixture(deployFixture);
                    await investManager.setDepositFee(0);
                    await investManager.setClaimFee(0);

                    const pool8InfoBefore = await investManager.pools(7);
                    const pool9InfoBefore = await investManager.pools(8);
                    const ownerInfoBefore = await investManager.accountToInvestorInfo(owner.address);
                    expect(await investManager.isInvestorInPool(owner.address, 7)).to.be.false;
                    expect(await investManager.isInvestorInPool(owner.address, 8)).to.be.false;

                    await expect(investManager.setWhitelist(owner.address, 7, true)).to.be.emit(investManager, "WhitelistUpdated");

                    const pool8InfoAfter = await investManager.pools(7);

                    await expect(investManager.setWhitelist(owner.address, 8, true)).to.be.emit(investManager, "WhitelistUpdated");

                    const pool9InfoAfter = await investManager.pools(8);
                    const ownerInfoAfter = await investManager.accountToInvestorInfo(owner.address);
                    expect(await investManager.isInvestorInPool(owner.address, 7)).to.be.true;
                    expect(await investManager.isInvestorInPool(owner.address, 8)).to.be.true;

                    expect(pool8InfoBefore[0]).to.be.equal(false);
                    expect(pool8InfoBefore[1]).to.be.equal(0);
                    expect(pool8InfoBefore[2]).to.be.equal(0);
                    expect(pool8InfoBefore[3]).to.be.equal(0);
                    expect(pool8InfoBefore[4]).to.be.equal(0);
                    expect(pool8InfoBefore[8]).to.be.equal(1000);

                    expect(pool9InfoBefore[0]).to.be.equal(false);
                    expect(pool9InfoBefore[1]).to.be.equal(0);
                    expect(pool9InfoBefore[2]).to.be.equal(0);
                    expect(pool9InfoBefore[3]).to.be.equal(0);
                    expect(pool9InfoBefore[4]).to.be.equal(0);
                    expect(pool9InfoBefore[8]).to.be.equal(1000);

                    expect(pool8InfoAfter[0]).to.be.equal(true);
                    expect(pool8InfoAfter[1]).to.be.equal(0);
                    expect(pool8InfoAfter[2]).to.be.equal(0);
                    expect(pool8InfoAfter[3]).to.be.equal(1);
                    expect(pool8InfoAfter[4]).to.be.equal(0);
                    expect(pool8InfoAfter[8]).to.be.equal(1000);

                    expect(pool9InfoAfter[0]).to.be.equal(true);
                    expect(pool9InfoAfter[1]).to.be.equal(0);
                    expect(pool9InfoAfter[2]).to.be.equal(0);
                    expect(pool9InfoAfter[3]).to.be.equal(1);
                    expect(pool9InfoAfter[4]).to.be.equal(0);
                    expect(pool9InfoAfter[8]).to.be.equal(1000);

                    expect(ownerInfoAfter).to.be.deep.equal(ownerInfoBefore);
                });

                it("Should accumulate share after activating whitelist pools", async function () {
                    const { 
                        investManager,
                        token,
                        owner,
                        startTime
                    } = await loadFixture(deployFixture);

                    await investManager.setWhitelist(owner.address, 7, true);
                    await investManager.setWhitelist(owner.address, 8, true);
                    const depositAmount = await ethers.parseEther("10");
                    await token.approve(await investManager.getAddress(), depositAmount);
                    await time.increaseTo(startTime);

                    await investManager.deposit(depositAmount, ethers.ZeroAddress);

                    const pool8Info = await investManager.pools(7);
                    const pool9Info = await investManager.pools(8);

                    const expectedPool8CurReward = depositAmount * BigInt(100) / BigInt(1000000);
                    const expectedPool9CurReward = depositAmount * BigInt(100) / BigInt(1000000);

                    expect(pool8Info[0]).to.be.equal(true);
                    expect(pool9Info[0]).to.be.equal(true);

                    expect(pool8Info[1]).to.be.equal(expectedPool8CurReward);
                    expect(pool9Info[1]).to.be.equal(expectedPool9CurReward);
                });

                it("Should correct distribute pool rewards with whitelist pools", async function () {
                    const { investManager, owner, token, account2,account8, startTime } = await loadFixture(deployFixtureWithRefsAndActivePools);

                    const depositAmount = ethers.parseEther("550000");
                    await token.transfer(account8.address, depositAmount);
                    await token.connect(account8).approve(await investManager.getAddress(), depositAmount);
                    const expectedEndedRoundsBeforeDeposit = BigInt(4);
                    const expectedEndedRoundsAfterDeposit = BigInt(4);

                    await time.increaseTo(BigInt(startTime) + ((await investManager.roundDuration()) * expectedEndedRoundsBeforeDeposit + BigInt(15)));

                    await investManager.setWhitelist(account2.address, 7, true);
                    await investManager.setWhitelist(account2.address, 8, true);
                    await expect(investManager.connect(account8).deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, account8, -depositAmount);

                    await time.increaseTo(BigInt(startTime) + ((await investManager.roundDuration()) * expectedEndedRoundsAfterDeposit * BigInt(2)));

                    const expectedOwnerDailyRewards = (ethers.parseEther("3000000") * BigInt(30) / BigInt(10000));
                    const expectedAccount2DailyRewards = (ethers.parseEther("1200000") * BigInt(30) / BigInt(10000));
                    const expectedOwnerDirectRefRewards = (ethers.parseEther("6000000") * BigInt(25) / BigInt(100000));
                    const expectedAccount2DirectRefRewardsBefore = (ethers.parseEther("20") * BigInt(25) / BigInt(100000));
                    const expectedAccount2DirectRefRewards = (ethers.parseEther("550020") * BigInt(25) / BigInt(100000));
                    const expectedOwnerDownlineRefRewardsBefore = (ethers.parseEther("60") * BigInt(675) / BigInt(10000000));
                    const expectedOwnerDownlineRefRewards = (ethers.parseEther("550060") * BigInt(675) / BigInt(10000000));
                    const expectedPool1Rewards = ethers.parseEther("6000060") * BigInt(175) / BigInt(1000000);
                    const expectedPool2Rewards = ethers.parseEther("3600060") * BigInt(175) / BigInt(1000000);
                    const expectedPool3Rewards = ethers.parseEther("1200060") * BigInt(175) / BigInt(1000000);
                    const expectedPool8Rewards = ethers.parseEther("9000060") * BigInt(100) / BigInt(1000000);
                    const expectedPool9Rewards = ethers.parseEther("9000060") * BigInt(100) / BigInt(1000000);
                    const expectedPool1RewardsAfter = ethers.parseEther("6550060") * BigInt(175) / BigInt(1000000);
                    const expectedPool2RewardsAfter = ethers.parseEther("4150060") * BigInt(175) / BigInt(1000000);
                    const expectedPool3RewardsAfter = ethers.parseEther("1750060") * BigInt(175) / BigInt(1000000);
                    const expectedPool8RewardsAfter = ethers.parseEther("9550060") * BigInt(100) / BigInt(1000000);
                    const expectedPool9RewardsAfter = ethers.parseEther("9550060") * BigInt(100) / BigInt(1000000);
                    const expectedOwnerAccumulatedRewards = (
                        expectedOwnerDailyRewards +
                        expectedOwnerDirectRefRewards +
                        expectedOwnerDownlineRefRewardsBefore +
                        expectedPool1Rewards +
                        expectedPool2Rewards + 
                        expectedPool3Rewards +
                        expectedPool8Rewards +
                        expectedPool9Rewards
                    ) * expectedEndedRoundsBeforeDeposit + (
                        expectedOwnerDailyRewards +
                        expectedOwnerDirectRefRewards +
                        expectedOwnerDownlineRefRewards +
                        expectedPool1RewardsAfter / BigInt(2) +
                        expectedPool2RewardsAfter +
                        expectedPool3RewardsAfter +
                        expectedPool8RewardsAfter / BigInt(2) +
                        expectedPool9RewardsAfter / BigInt(2)
                    ) * expectedEndedRoundsAfterDeposit;
                    const expectedAccount2AccumulatedRewards = (
                        expectedAccount2DailyRewards +
                        expectedAccount2DirectRefRewardsBefore
                    ) * expectedEndedRoundsBeforeDeposit + (
                        expectedAccount2DailyRewards +
                        expectedAccount2DirectRefRewards +
                        expectedPool1RewardsAfter / BigInt(2) +
                        expectedPool8RewardsAfter / BigInt(2) +
                        expectedPool9RewardsAfter / BigInt(2)
                    ) * expectedEndedRoundsAfterDeposit;
                    expect(await investManager.getAccumulatedRewards(owner.address)).to.be.equal(expectedOwnerAccumulatedRewards);
                    expect(await investManager.connect(account2).getAccumulatedRewards(account2.address)).to.be.equal(expectedAccount2AccumulatedRewards);
                });

                it("Should disable whitelist pools and remove investor from whitelist", async function () {
                    const { investManager, owner, token, account2,account8, startTime } = await loadFixture(deployFixtureWithRefsAndActivePools);

                    const expectedEndedRoundsBefore = BigInt(4);
                    await time.increaseTo(BigInt(startTime) + ((await investManager.roundDuration()) * expectedEndedRoundsBefore + BigInt(15)));

                    const expectedPool1Rewards = ethers.parseEther("6000060") * BigInt(175) / BigInt(1000000);
                    const expectedPool2Rewards = ethers.parseEther("3600060") * BigInt(175) / BigInt(1000000);
                    const expectedPool3Rewards = ethers.parseEther("1200060") * BigInt(175) / BigInt(1000000);
                    const expectedPool8Rewards = ethers.parseEther("9000060") * BigInt(100) / BigInt(1000000);
                    const expectedPool9Rewards = ethers.parseEther("9000060") * BigInt(100) / BigInt(1000000);
                    const expectedPoolRewards = (
                        expectedPool1Rewards +
                        expectedPool2Rewards +
                        expectedPool3Rewards +
                        expectedPool8Rewards +
                        expectedPool9Rewards
                    ) * expectedEndedRoundsBefore;

                    const ownerInfoBefore = await investManager.accountToInvestorInfo(owner.address);
                    const pool8InfoBefore = await investManager.pools(7);
                    const pool9InfoBefore = await investManager.pools(8);
                    expect(await investManager.isInvestorInPool(owner.address, 7)).to.be.true;
                    expect(await investManager.isInvestorInPool(owner.address, 8)).to.be.true;
                    expect(pool8InfoBefore[0]).to.be.true;
                    expect(pool9InfoBefore[0]).to.be.true;
                    expect(pool8InfoBefore[3]).to.be.equal(1);
                    expect(pool9InfoBefore[3]).to.be.equal(1);

                    await expect(investManager.setWhitelist(owner.address, 7, false)).to.be.emit(investManager, "WhitelistUpdated");

                    const ownerInfoAfter = await investManager.accountToInvestorInfo(owner.address);
                    const pool8InfoAfter = await investManager.pools(7);
                    const pool9InfoAfter = await investManager.pools(8);
                    expect(await investManager.isInvestorInPool(owner.address, 7)).to.be.false;
                    expect(await investManager.isInvestorInPool(owner.address, 8)).to.be.true;

                    expect(ownerInfoAfter[8]).to.be.equal(ownerInfoBefore[8] + expectedPoolRewards);
                    expect(pool8InfoAfter[0]).to.be.false;
                    expect(pool9InfoAfter[0]).to.be.true;
                    expect(pool8InfoAfter[3]).to.be.equal(0);
                    expect(pool9InfoAfter[3]).to.be.equal(1);
                    expect(pool8InfoAfter[1]).to.be.equal(pool8InfoBefore[1]);
                    expect(pool9InfoAfter[1]).to.be.equal(pool9InfoBefore[1]);
                    expect(pool8InfoAfter[2]).to.be.equal(expectedPool8Rewards);
                    expect(pool9InfoAfter[2]).to.be.equal(expectedPool9Rewards);
                    expect(pool8InfoAfter[4]).to.be.equal(expectedPool8Rewards * expectedEndedRoundsBefore);
                    expect(pool9InfoAfter[4]).to.be.equal(expectedPool9Rewards * expectedEndedRoundsBefore);
                    expect(pool8InfoAfter[5]).to.be.equal(pool8InfoBefore[5]);
                    expect(pool9InfoAfter[5]).to.be.equal(pool9InfoBefore[5]);
                });
            });
        });

        describe("Referal system", function () {
            it("Should correctly set the info of referals", async function () {
                const { 
                    investManager,
                    token,
                    owner,
                    account1,
                    account2,
                    account3,
                    account4,
                    account5,
                    account6,
                    account7,
                    account8,
                    account9,
                    account10,
                    account11,
                    startTime
                } = await loadFixture(deployFixtureWithMaxRefsCount);

                const depositAmount = ethers.parseEther("1");

                const ownerInfo = await investManager.accountToInvestorInfo(owner.address);
                const account1Info = await investManager.accountToInvestorInfo(account1.address);
                const account2Info = await investManager.accountToInvestorInfo(account2.address);
                const account3Info = await investManager.accountToInvestorInfo(account3.address);
                const account4Info = await investManager.accountToInvestorInfo(account4.address);
                const account5Info = await investManager.accountToInvestorInfo(account5.address);
                const account6Info = await investManager.accountToInvestorInfo(account6.address);
                const account7Info = await investManager.accountToInvestorInfo(account7.address);
                const account8Info = await investManager.accountToInvestorInfo(account8.address);
                const account9Info = await investManager.accountToInvestorInfo(account9.address);
                const account10Info = await investManager.accountToInvestorInfo(account10.address);
                const account11Info = await investManager.accountToInvestorInfo(account11.address);

                [
                    ownerInfo,
                    account1Info,
                    account2Info,
                    account3Info,
                    account4Info,
                    account5Info,
                    account6Info,
                    account7Info,
                    account8Info,
                    account9Info,
                    account10Info,
                ].forEach((info) => {
                    expect(info[0]).to.be.equal(depositAmount);
                    expect(info[1]).to.be.equal(1);
                    expect(info[3]).to.be.equal(depositAmount);
                    expect(info[6]).to.be.equal(0);
                    expect(info[7]).to.be.equal(0);
                });

                expect(ownerInfo[2]).to.be.equal(9);
                expect(ownerInfo[4]).to.be.equal(depositAmount * BigInt(9));
                expect(ownerInfo[5]).to.be.equal(ethers.ZeroAddress);

                expect(account1Info[2]).to.be.equal(9);
                expect(account1Info[4]).to.be.equal(depositAmount * BigInt(9));
                expect(account1Info[5]).to.be.equal(owner.address);

                expect(account2Info[2]).to.be.equal(8);
                expect(account2Info[4]).to.be.equal(depositAmount * BigInt(8));
                expect(account2Info[5]).to.be.equal(account1.address);

                expect(account3Info[2]).to.be.equal(7);
                expect(account3Info[4]).to.be.equal(depositAmount * BigInt(7));
                expect(account3Info[5]).to.be.equal(account2.address);

                expect(account4Info[2]).to.be.equal(6);
                expect(account4Info[4]).to.be.equal(depositAmount * BigInt(6));
                expect(account4Info[5]).to.be.equal(account3.address);

                expect(account5Info[2]).to.be.equal(5);
                expect(account5Info[4]).to.be.equal(depositAmount * BigInt(5));
                expect(account5Info[5]).to.be.equal(account4.address);

                expect(account6Info[2]).to.be.equal(4);
                expect(account6Info[4]).to.be.equal(depositAmount * BigInt(4));
                expect(account6Info[5]).to.be.equal(account5.address);

                expect(account7Info[2]).to.be.equal(3);
                expect(account7Info[4]).to.be.equal(depositAmount * BigInt(3));
                expect(account7Info[5]).to.be.equal(account6.address);

                expect(account8Info[2]).to.be.equal(2);
                expect(account8Info[4]).to.be.equal(depositAmount * BigInt(2));
                expect(account8Info[5]).to.be.equal(account7.address);

                expect(account9Info[2]).to.be.equal(1);
                expect(account9Info[4]).to.be.equal(depositAmount);
                expect(account9Info[5]).to.be.equal(account8.address);

                expect(account10Info[2]).to.be.equal(0);
                expect(account10Info[4]).to.be.equal(0);
                expect(account10Info[5]).to.be.equal(account9.address);

                expect(account11Info[2]).to.be.equal(0);
                expect(account11Info[4]).to.be.equal(0);
                expect(account11Info[5]).to.be.equal(account10.address);
                expect(account11Info[0]).to.be.equal(depositAmount);
                expect(account11Info[1]).to.be.equal(0);
                expect(account11Info[3]).to.be.equal(0);
                expect(account11Info[6]).to.be.equal(0);
                expect(account11Info[7]).to.be.equal(0);
            });

            it("Should not receive the reward if investor is not in the third pool", async function () {
                const { investManager, token, owner, account2, startTime } = await loadFixture(deployFixtureWithRefsAndThreeActivePools);

                const depositAmount = ethers.parseEther("1");
                await token.approve(await investManager.getAddress(), depositAmount);

                const expectedEndedRounds = BigInt(4);
                const claimTime = BigInt(startTime) + ((await investManager.roundDuration()) * expectedEndedRounds + BigInt(100));
                await time.increaseTo(claimTime);

                const expectedDailyRewards = (ethers.parseEther("1200000") * BigInt(30) / BigInt(10000));
                const expectedDirectRefRewards = (ethers.parseEther("20") * BigInt(25) / BigInt(100000));
                const expectedDownlineRefRewards = BigInt(0);
                const expectedPool1Rewards = BigInt(0);
                const expectedPool2Rewards = BigInt(0);
                const expectedPool3Rewards = BigInt(0);
                const expectedAccumulatedRewards = (
                    expectedDailyRewards +
                    expectedDirectRefRewards +
                    expectedDownlineRefRewards +
                    expectedPool1Rewards +
                    expectedPool2Rewards + 
                    expectedPool3Rewards
                ) * expectedEndedRounds;
                const expectedUserReceive = expectedAccumulatedRewards * BigInt(50) / BigInt(100);

                expect(await investManager.connect(account2).getAccumulatedRewards(account2.address)).to.be.equal(expectedAccumulatedRewards);

                await expect(investManager.connect(account2).claimReward()).to.be.changeTokenBalance(token, account2, expectedUserReceive);

                expect(await investManager.connect(account2).getAccumulatedRewards(account2.address)).to.be.equal(0);
            });

            it("Should not add direct or downline refs count if not first deposit", async function () {
                const { investManager, token, owner, account2, account8, startTime } = await loadFixture(deployFixtureWithRefsAndThreeActivePools);

                const depositAmount = ethers.parseEther("1");
                await token.transfer(account8.address, depositAmount);
                await token.connect(account8).approve(await investManager.getAddress(), depositAmount);

                const claimTime = BigInt(startTime) + (await investManager.depositDelay() + BigInt(100));
                await time.increaseTo(claimTime);

                const ownerInfoBefore = await investManager.accountToInvestorInfo(owner.address);
                const account2InfoBefore = await investManager.accountToInvestorInfo(account2.address);
                const account8InfoBefore = await investManager.accountToInvestorInfo(account8.address);

                await expect(investManager.connect(account8).deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, account8, -depositAmount);

                const ownerInfoAfter = await investManager.accountToInvestorInfo(owner.address);
                const account2InfoAfter = await investManager.accountToInvestorInfo(account2.address);
                const account8InfoAfter = await investManager.accountToInvestorInfo(account8.address);

                expect(ownerInfoBefore[0]).to.be.equal(ownerInfoAfter[0]);
                expect(ownerInfoBefore[1]).to.be.equal(ownerInfoAfter[1]);
                expect(ownerInfoBefore[2]).to.be.equal(ownerInfoAfter[2]);
                expect(ownerInfoBefore[3]).to.be.equal(ownerInfoAfter[3]);
                expect(ownerInfoBefore[4] + depositAmount).to.be.equal(ownerInfoAfter[4]);

                expect(account2InfoBefore[0]).to.be.equal(account2InfoAfter[0]);
                expect(account2InfoBefore[1]).to.be.equal(account2InfoAfter[1]);
                expect(account2InfoBefore[2]).to.be.equal(account2InfoAfter[2]);
                expect(account2InfoBefore[3] + depositAmount).to.be.equal(account2InfoAfter[3]);
                expect(account2InfoBefore[4]).to.be.equal(account2InfoAfter[4]);

                expect(account8InfoBefore[0] + depositAmount).to.be.equal(account8InfoAfter[0]);
                expect(account8InfoBefore[1]).to.be.equal(account8InfoAfter[1]);
                expect(account8InfoBefore[2]).to.be.equal(account8InfoAfter[2]);
                expect(account8InfoBefore[3]).to.be.equal(account8InfoAfter[3]);
                expect(account8InfoBefore[4]).to.be.equal(account8InfoAfter[4]);
            });
        });

        describe("Fees", function () {
            it("Should correctly take fees on deposit", async function () {
                const { investManager, token, owner, treasury, treasury2, startTime, dexRouter } = await loadFixture(deployFixture);
                await token.approve(await dexRouter.getAddress(), ethers.parseEther("200000"));
                await dexRouter.addLiquidityETH(
                    await token.getAddress(),
                    ethers.parseEther("200000"),
                    1,
                    1,
                    owner.address,
                    await time.latest() + 10,
                    { value: ethers.parseEther("100")}
                );

                const depositAmount = ethers.parseEther("10");
                await token.approve(await investManager.getAddress(), await token.balanceOf(owner.address));
                await time.increaseTo(startTime);

                const expectedDepositFeeAmount = depositAmount * (await investManager.depositFeeInBp()) / await investManager.BASIS_POINTS();
                const expectedAmountsOut = await dexRouter.getAmountsOut(expectedDepositFeeAmount, [await token.getAddress(), await dexRouter.WETH()]);
                const expectedTreasuryTotalAdd = expectedAmountsOut[1];
                const expectedTreasuryAdd = expectedTreasuryTotalAdd * BigInt(70) / BigInt(100);
                const expectedTreasury2Add = expectedTreasuryTotalAdd - expectedTreasuryAdd;

                const treasuryBalanceBefore = await ethers.provider.getBalance(treasury.address);
                const treasury2BalanceBefore = await ethers.provider.getBalance(treasury2.address);

                await expect(investManager.deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, owner, -depositAmount);

                const treasuryBalanceAfter = await ethers.provider.getBalance(treasury.address);
                const treasury2BalanceAfter = await ethers.provider.getBalance(treasury2.address);

                expect(treasuryBalanceAfter).to.be.equal(treasuryBalanceBefore + expectedTreasuryAdd);
                expect(treasury2BalanceAfter).to.be.equal(treasury2BalanceBefore + expectedTreasury2Add);
            });

            it("Should accumulate fees if swap reverted", async function () {
                const { investManager, token, otherAccount, owner, treasury, treasury2, startTime, dexRouter } = await loadFixture(deployFixture);
                const depositAmount = ethers.parseEther("10");
                await token.transfer(otherAccount.address, depositAmount);
                await token.approve(await investManager.getAddress(), depositAmount);
                await token.connect(otherAccount).approve(await investManager.getAddress(), depositAmount);
                await time.increaseTo(startTime);

                const expectedDepositFeeAmount = depositAmount * (await investManager.depositFeeInBp()) / await investManager.BASIS_POINTS();

                await expect(investManager.deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalances(token, [owner, investManager], [-depositAmount, expectedDepositFeeAmount]);

                await token.approve(await dexRouter.getAddress(), ethers.parseEther("200000"));
                await dexRouter.addLiquidityETH(
                    await token.getAddress(),
                    ethers.parseEther("200000"),
                    1,
                    1,
                    owner.address,
                    await time.latest() + 10,
                    { value: ethers.parseEther("100")}
                );

                const expectedAmountsOut = await dexRouter.getAmountsOut(expectedDepositFeeAmount * BigInt(2), [await token.getAddress(), await dexRouter.WETH()]);
                const expectedTreasuryTotalAdd = expectedAmountsOut[1];
                const expectedTreasuryAdd = expectedTreasuryTotalAdd * BigInt(70) / BigInt(100);
                const expectedTreasury2Add = expectedTreasuryTotalAdd - expectedTreasuryAdd;

                const treasuryBalanceBefore = await ethers.provider.getBalance(treasury.address);
                const treasury2BalanceBefore = await ethers.provider.getBalance(treasury2.address);

                await expect(investManager.connect(otherAccount).deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalances(token, [otherAccount, investManager], [-depositAmount, -expectedDepositFeeAmount]);

                const treasuryBalanceAfter = await ethers.provider.getBalance(treasury.address);
                const treasury2BalanceAfter = await ethers.provider.getBalance(treasury2.address);

                expect(treasuryBalanceAfter).to.be.equal(treasuryBalanceBefore + expectedTreasuryAdd);
                expect(treasury2BalanceAfter).to.be.equal(treasury2BalanceBefore + expectedTreasury2Add);
            });
        });

        describe("Admin", function () {
            it("Should set deposit fee", async function () {
                const { investManager } = await loadFixture(deployFixture);
                const feeInBp = BigInt(10000);

                expect(await investManager.depositFeeInBp()).to.be.equal(await investManager.MAX_FEE());

                await expect(investManager.setDepositFee(feeInBp)).to.be.not.reverted;

                expect(await investManager.depositFeeInBp()).to.be.equal(feeInBp);
            });

            it("Should set claim fee", async function () {
                const { investManager } = await loadFixture(deployFixture);
                const feeInBp = BigInt(10000);

                expect(await investManager.claimFeeInBp()).to.be.equal(await investManager.MAX_FEE());

                await expect(investManager.setClaimFee(feeInBp)).to.be.not.reverted;

                expect(await investManager.claimFeeInBp()).to.be.equal(feeInBp);
            });

            it("Should revert set deposit fee by not owner", async function () {
                const { investManager, otherAccount } = await loadFixture(deployFixture);
                const feeInBp = BigInt(10000);

                expect(await investManager.depositFeeInBp()).to.be.equal(await investManager.MAX_FEE());

                await expect(investManager.connect(otherAccount).setDepositFee(feeInBp)).to.be.revertedWithCustomError(investManager, "OwnableUnauthorizedAccount");

                expect(await investManager.depositFeeInBp()).to.be.equal(await investManager.MAX_FEE());
            });

            it("Should revert set claim fee by not owner", async function () {
                const { investManager, otherAccount } = await loadFixture(deployFixture);
                const feeInBp = BigInt(10000);

                expect(await investManager.claimFeeInBp()).to.be.equal(await investManager.MAX_FEE());

                await expect(investManager.connect(otherAccount).setClaimFee(feeInBp)).to.be.revertedWithCustomError(investManager, "OwnableUnauthorizedAccount");

                expect(await investManager.claimFeeInBp()).to.be.equal(await investManager.MAX_FEE());
            });

            it("Should revert set invalid deposit fee", async function () {
                const { investManager } = await loadFixture(deployFixture);
                const feeInBp = (await investManager.MAX_FEE()) + BigInt(1);

                expect(await investManager.depositFeeInBp()).to.be.equal(await investManager.MAX_FEE());

                await expect(investManager.setDepositFee(feeInBp)).to.be.revertedWithCustomError(investManager, "InvalidFee");

                expect(await investManager.depositFeeInBp()).to.be.equal(await investManager.MAX_FEE());
            });

            it("Should revert set invalid claim fee", async function () {
                const { investManager } = await loadFixture(deployFixture);
                const feeInBp = (await investManager.MAX_FEE()) + BigInt(1);

                expect(await investManager.claimFeeInBp()).to.be.equal(await investManager.MAX_FEE());

                await expect(investManager.setClaimFee(feeInBp)).to.be.revertedWithCustomError(investManager, "InvalidFee");

                expect(await investManager.claimFeeInBp()).to.be.equal(await investManager.MAX_FEE());
            });

            it("Should set whitelist", async function () {
                const { investManager, owner } = await loadFixture(deployFixture);

                const poolId = 7;
                expect(await investManager.isWhitelisted(owner.address, poolId)).to.be.false;
                expect(await investManager.onlyWhitelistedInvestorsCount()).to.be.equal(0);

                await expect(investManager.setWhitelist(owner.address, poolId, true)).to.be.emit(investManager, "WhitelistUpdated");

                expect(await investManager.isWhitelisted(owner.address, poolId)).to.be.true;
                expect(await investManager.onlyWhitelistedInvestorsCount()).to.be.equal(1);

                await expect(investManager.setWhitelist(owner.address, poolId, false)).to.be.emit(investManager, "WhitelistUpdated");

                expect(await investManager.isWhitelisted(owner.address, poolId)).to.be.false;
                expect(await investManager.onlyWhitelistedInvestorsCount()).to.be.equal(0);
            });

            it("Should revert set whitelist by not owner", async function () {
                const { investManager, owner, otherAccount } = await loadFixture(deployFixture);

                const poolId = 7;
                expect(await investManager.isWhitelisted(owner.address, poolId)).to.be.false;
                expect(await investManager.onlyWhitelistedInvestorsCount()).to.be.equal(0);

                await expect(investManager.connect(otherAccount).setWhitelist(owner.address, poolId, true)).to.be.revertedWithCustomError(investManager, "OwnableUnauthorizedAccount");

                expect(await investManager.isWhitelisted(owner.address, poolId)).to.be.false;
                expect(await investManager.onlyWhitelistedInvestorsCount()).to.be.equal(0);
            });

            it("Should revert add to whitelist if account already in list", async function () {
                const { investManager, owner, otherAccount } = await loadFixture(deployFixture);
                const poolId = 7;
                await investManager.setWhitelist(owner.address, poolId, true);

                expect(await investManager.isWhitelisted(owner.address, poolId)).to.be.true;
                expect(await investManager.onlyWhitelistedInvestorsCount()).to.be.equal(1);

                await expect(investManager.setWhitelist(owner.address, poolId, true)).to.be.revertedWithCustomError(investManager, "InvestorAlreadyWhitelisted");

                expect(await investManager.isWhitelisted(owner.address, poolId)).to.be.true;
                expect(await investManager.onlyWhitelistedInvestorsCount()).to.be.equal(1);
            });

            it("Should revert remove from whitelist if account already not in list", async function () {
                const { investManager, owner, otherAccount } = await loadFixture(deployFixture);

                const poolId = 7;
                expect(await investManager.isWhitelisted(owner.address, poolId)).to.be.false;
                expect(await investManager.onlyWhitelistedInvestorsCount()).to.be.equal(0);

                await expect(investManager.setWhitelist(owner.address, poolId, false)).to.be.revertedWithCustomError(investManager, "InvestorAlreadyNotWhitelisted");

                expect(await investManager.isWhitelisted(owner.address, poolId)).to.be.false;
                expect(await investManager.onlyWhitelistedInvestorsCount()).to.be.equal(0);
            });

            it("Should revert add to whitelist with invalid poolId", async function () {
                const { investManager, owner, otherAccount } = await loadFixture(deployFixture);

                const poolId = 6;
                expect(await investManager.isWhitelisted(owner.address, poolId)).to.be.false;
                expect(await investManager.onlyWhitelistedInvestorsCount()).to.be.equal(0);

                await expect(investManager.setWhitelist(owner.address, poolId, false)).to.be.revertedWithCustomError(investManager, "InvalidPoolId");

                expect(await investManager.isWhitelisted(owner.address, poolId)).to.be.false;
                expect(await investManager.onlyWhitelistedInvestorsCount()).to.be.equal(0);
            });

            it("Should set new pool criteria", async function () {
                const { investManager } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await investManager.setClaimFee(0);

                await investManager.setPoolCriteria(
                    [
                        0
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("275000"),
                            totalDirectInvestRequired: ethers.parseEther("275000"),
                            directRefsRequired: 1
                        }
                    ],
                    1
                );
            });

            it("Should set new pool criteria and remove investors for new criteria", async function () {
                const { investManager, owner, token, account2,account8, startTime } = await loadFixture(deployFixtureWithRefsAndThreeActivePools);

                const depositAmount = ethers.parseEther("550000");
                await token.transfer(account8.address, depositAmount);
                await token.connect(account8).approve(await investManager.getAddress(), depositAmount);

                const depositTime = BigInt(startTime) + (await investManager.depositDelay() + BigInt(100));
                await time.increaseTo(depositTime);

                await expect(investManager.connect(account8).deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, account8, -depositAmount);

                const ownerInfoBefore = await investManager.accountToInvestorInfo(owner.address);
                const account2InfoBefore = await investManager.accountToInvestorInfo(account2.address);
                const account8InfoBefore = await investManager.accountToInvestorInfo(account8.address);
                const poolInfoBefore = await investManager.pools(0);

                expect(account2InfoBefore[0]).to.be.equal(ethers.parseEther("1200000"));
                expect(account2InfoBefore[1]).to.be.equal(2);
                expect(account2InfoBefore[3]).to.be.equal(ethers.parseEther("550020"));
                expect(await investManager.isInvestorInPool(account2.address, 0)).to.be.equal(true);
                expect(await investManager.isInvestorInPool(owner.address, 0)).to.be.equal(true);
                expect(poolInfoBefore[3]).to.be.equal(2);

                await investManager.setPoolCriteria(
                    [
                        0
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("550000"),
                            totalDirectInvestRequired: ethers.parseEther("560000"),
                            directRefsRequired: 1
                        }
                    ],
                    0
                );

                expect(await investManager.isUpdateCriteriaActive()).to.be.equal(true);

                await investManager.setPoolCriteria(
                    [
                        // 0
                    ],
                    [
                        // {
                        //     personalInvestRequired: ethers.parseEther("550000"),
                        //     totalDirectInvestRequired: ethers.parseEther("560000"),
                        //     directRefsRequired: 1
                        // }
                    ],
                    100
                );

                const ownerInfoAfter = await investManager.accountToInvestorInfo(owner.address);
                const account2InfoAfter = await investManager.accountToInvestorInfo(account2.address);
                const account8InfoAfter = await investManager.accountToInvestorInfo(account8.address);
                const poolInfoAfter = await investManager.pools(0);

                expect(await investManager.isUpdateCriteriaActive()).to.be.equal(false);

                expect(account2InfoAfter[0]).to.be.equal(ethers.parseEther("1200000"));
                expect(account2InfoAfter[1]).to.be.equal(2);
                expect(account2InfoAfter[3]).to.be.equal(ethers.parseEther("550020"));
                expect(await investManager.isInvestorInPool(account2.address, 0)).to.be.equal(false);
                expect(await investManager.isInvestorInPool(owner.address, 0)).to.be.equal(true);
                expect(poolInfoAfter[3]).to.be.equal(1);
            });

            it("Should set new pool criteria and remove investors for new criteria and disable pool", async function () {
                const { investManager, owner, token, account2,account8, startTime } = await loadFixture(deployFixtureWithRefsAndThreeActivePools);

                const depositAmount = ethers.parseEther("550000");
                await token.transfer(account8.address, depositAmount);
                await token.connect(account8).approve(await investManager.getAddress(), depositAmount);

                const depositTime = BigInt(startTime) + (await investManager.depositDelay() + BigInt(100));
                await time.increaseTo(depositTime);

                await expect(investManager.connect(account8).deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, account8, -depositAmount);

                const ownerInfoBefore = await investManager.accountToInvestorInfo(owner.address);
                const account2InfoBefore = await investManager.accountToInvestorInfo(account2.address);
                const account8InfoBefore = await investManager.accountToInvestorInfo(account8.address);
                const poolInfoBefore = await investManager.pools(2);

                expect(ownerInfoBefore[0]).to.be.equal(ethers.parseEther("3000000"));
                expect(ownerInfoBefore[1]).to.be.equal(5);
                expect(ownerInfoBefore[3]).to.be.equal(ethers.parseEther("6000000"));
                expect(await investManager.isInvestorInPool(owner.address, 2)).to.be.equal(true);
                expect(poolInfoBefore[3]).to.be.equal(1);

                await investManager.setPoolCriteria(
                    [
                        2
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("3100000"),
                            totalDirectInvestRequired: ethers.parseEther("6000000"),
                            directRefsRequired: 5
                        }
                    ],
                    0
                );

                expect(await investManager.isUpdateCriteriaActive()).to.be.equal(true);

                await investManager.setPoolCriteria(
                    [
                        // 0
                    ],
                    [
                        // {
                        //     personalInvestRequired: ethers.parseEther("550000"),
                        //     totalDirectInvestRequired: ethers.parseEther("560000"),
                        //     directRefsRequired: 1
                        // }
                    ],
                    100
                );

                const ownerInfoAfter = await investManager.accountToInvestorInfo(owner.address);
                const poolInfoAfter = await investManager.pools(2);

                expect(await investManager.isUpdateCriteriaActive()).to.be.equal(false);

                expect(ownerInfoAfter[0]).to.be.equal(ethers.parseEther("3000000"));
                expect(ownerInfoAfter[1]).to.be.equal(5);
                expect(ownerInfoAfter[3]).to.be.equal(ethers.parseEther("6000000"));
                expect(await investManager.isInvestorInPool(owner.address, 2)).to.be.equal(false);
                expect(poolInfoAfter[0]).to.be.equal(false);
                expect(poolInfoAfter[3]).to.be.equal(0);
            });

            it("Should set new pool criteria and add investors for new criteria", async function () {
                const { investManager, owner, token, account2,account8, startTime } = await loadFixture(deployFixtureWithRefsAndThreeActivePools);

                const depositAmount = ethers.parseEther("540000");
                await token.transfer(account8.address, depositAmount);
                await token.connect(account8).approve(await investManager.getAddress(), depositAmount);

                const depositTime = BigInt(startTime) + (await investManager.depositDelay() + BigInt(100));
                await time.increaseTo(depositTime);

                await expect(investManager.connect(account8).deposit(depositAmount, ethers.ZeroAddress)).to.be.changeTokenBalance(token, account8, -depositAmount);

                const ownerInfoBefore = await investManager.accountToInvestorInfo(owner.address);
                const account2InfoBefore = await investManager.accountToInvestorInfo(account2.address);
                const account8InfoBefore = await investManager.accountToInvestorInfo(account8.address);
                const poolInfoBefore = await investManager.pools(0);

                expect(account2InfoBefore[0]).to.be.equal(ethers.parseEther("1200000"));
                expect(account2InfoBefore[1]).to.be.equal(2);
                expect(account2InfoBefore[3]).to.be.equal(ethers.parseEther("540020"));
                expect(await investManager.isInvestorInPool(account2.address, 0)).to.be.equal(false);
                expect(await investManager.isInvestorInPool(owner.address, 0)).to.be.equal(true);
                expect(poolInfoBefore[3]).to.be.equal(1);

                await investManager.setPoolCriteria(
                    [
                        0
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("550000"),
                            totalDirectInvestRequired: ethers.parseEther("540000"),
                            directRefsRequired: 1
                        }
                    ],
                    0
                );

                expect(await investManager.isUpdateCriteriaActive()).to.be.equal(true);

                await investManager.setPoolCriteria(
                    [
                        // 0
                    ],
                    [
                        // {
                        //     personalInvestRequired: ethers.parseEther("550000"),
                        //     totalDirectInvestRequired: ethers.parseEther("560000"),
                        //     directRefsRequired: 1
                        // }
                    ],
                    100
                );

                const ownerInfoAfter = await investManager.accountToInvestorInfo(owner.address);
                const account2InfoAfter = await investManager.accountToInvestorInfo(account2.address);
                const account8InfoAfter = await investManager.accountToInvestorInfo(account8.address);
                const poolInfoAfter = await investManager.pools(0);

                expect(await investManager.isUpdateCriteriaActive()).to.be.equal(false);

                expect(account2InfoAfter[0]).to.be.equal(ethers.parseEther("1200000"));
                expect(account2InfoAfter[1]).to.be.equal(2);
                expect(account2InfoAfter[3]).to.be.equal(ethers.parseEther("540020"));
                expect(await investManager.isInvestorInPool(account2.address, 0)).to.be.equal(true);
                expect(await investManager.isInvestorInPool(owner.address, 0)).to.be.equal(true);
                expect(poolInfoAfter[3]).to.be.equal(2);
            });

            it("Should revert set new pool criteria by not owner", async function () {
                const { investManager, otherAccount } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await investManager.setClaimFee(0);

                await expect(investManager.connect(otherAccount).setPoolCriteria(
                    [
                        0
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("275000"),
                            totalDirectInvestRequired: ethers.parseEther("275000"),
                            directRefsRequired: 1
                        }
                    ],
                    1
                )).to.be.revertedWithCustomError(investManager, "OwnableUnauthorizedAccount");
            });

            it("Should revert set new pool criteria with half criteria", async function () {
                const { investManager } = await loadFixture(deployFixture);

                await expect(investManager.setPoolCriteria(
                    [
                        1
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("724999"),
                            totalDirectInvestRequired: ethers.parseEther("725000"),
                            directRefsRequired: 3
                        }
                    ],
                    1
                )).to.be.revertedWithCustomError(investManager, "HalfRequirementViolated");
            });

            it("Should revert set new pool criteria with invalid poolId", async function () {
                const { investManager } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await investManager.setClaimFee(0);

                await expect(investManager.setPoolCriteria(
                    [
                        7
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("724999"),
                            totalDirectInvestRequired: ethers.parseEther("725000"),
                            directRefsRequired: 3
                        }
                    ],
                    1
                )).to.be.revertedWithCustomError(investManager, "InvalidPoolId");
            });

            it("Should revert set new pool criteria with invalid array length", async function () {
                const { investManager } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await investManager.setClaimFee(0);

                await expect(investManager.setPoolCriteria(
                    [
                        0, 1
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("724999"),
                            totalDirectInvestRequired: ethers.parseEther("725000"),
                            directRefsRequired: 3
                        }
                    ],
                    1
                )).to.be.revertedWithCustomError(investManager, "InvalidArrayLengths");
            });

            it("Should revert set new pool criteria if update not available yet", async function () {
                const { investManager } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await investManager.setClaimFee(0);

                await investManager.setPoolCriteria(
                    [
                        0
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("275000"),
                            totalDirectInvestRequired: ethers.parseEther("275000"),
                            directRefsRequired: 1
                        }
                    ],
                    1
                );

                await expect(investManager.setPoolCriteria(
                    [
                        0
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("275000"),
                            totalDirectInvestRequired: ethers.parseEther("275000"),
                            directRefsRequired: 1
                        }
                    ],
                    1
                )).to.be.revertedWithCustomError(investManager, "SetPoolCriteriaNotYetAvailable");
            });

            it("Should revert set new pool criteria with invalid personal invest sequence", async function () {
                const { investManager } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await investManager.setClaimFee(0);

                await expect(investManager.setPoolCriteria(
                    [
                        0, 1
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("770000"),
                            totalDirectInvestRequired: ethers.parseEther("600000"),
                            directRefsRequired: 1
                        },
                        {
                            personalInvestRequired: ethers.parseEther("730000"),
                            totalDirectInvestRequired: ethers.parseEther("900000"),
                            directRefsRequired: 3
                        }
                    ],
                    1
                )).to.be.revertedWithCustomError(investManager, "SequencePoolCriteriaBroken");
            });

            it("Should revert set new pool criteria with invalid direct refs invest sequence", async function () {
                const { investManager } = await loadFixture(deployFixture);
                await investManager.setDepositFee(0);
                await investManager.setClaimFee(0);

                await expect(investManager.setPoolCriteria(
                    [
                        0, 1
                    ],
                    [
                        {
                            personalInvestRequired: ethers.parseEther("600000"),
                            totalDirectInvestRequired: ethers.parseEther("770000"),
                            directRefsRequired: 1
                        },
                        {
                            personalInvestRequired: ethers.parseEther("900000"),
                            totalDirectInvestRequired: ethers.parseEther("730000"),
                            directRefsRequired: 3
                        }
                    ],
                    1
                )).to.be.revertedWithCustomError(investManager, "SequencePoolCriteriaBroken");
            });
        });
    });
});
