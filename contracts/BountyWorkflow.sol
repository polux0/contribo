// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@inverter/contracts/Orchestrator.sol";
import "@inverter/contracts/modules/Authorizer.sol";
import "@inverter/contracts/modules/FundingManager.sol";
import "@inverter/contracts/modules/PaymentProcessor.sol";
import "@inverter/contracts/modules/BountiesModule.sol";

contract BountyWorkflow {
    Orchestrator public orchestrator;
    Authorizer public authorizer;
    FundingManager public fundingManager;
    PaymentProcessor public paymentProcessor;
    BountiesModule public bountiesModule;

    constructor(opacity
        address _orchestrator,
        address _authorizer,
        address _fundingManager,
        address _paymentProcessor,
        address _bountiesModule
    ) {
        orchestrator = Orchestrator(_orchestrator);
        authorizer = Authorizer(_authorizer);
        fundingManager = FundingManager(_fundingManager);
        paymentProcessor = PaymentProcessor(_paymentProcessor);
        bountiesModule = BountiesModule(_bountiesModule);
    }

    // Function to set up bounty roles using Authorizer
    function setupRoles(address issuer, address claimant, address verifier) external {
        authorizer.grantRole(authorizer.ISSUER_ROLE(), issuer);
        authorizer.grantRole(authorizer.CLAIMANT_ROLE(), claimant);
        authorizer.grantRole(authorizer.VERIFIER_ROLE(), verifier);
    }

    // Function to create a new bounty
    function createBounty(string calldata description, uint256 reward) external {
        require(authorizer.hasRole(authorizer.ISSUER_ROLE(), msg.sender), "Not authorized");
        bountiesModule.createBounty(description, reward);
    }

    // Function to claim a bounty
    function claimBounty(uint256 bountyId) external {
        require(authorizer.hasRole(authorizer.CLAIMANT_ROLE(), msg.sender), "Not authorized");
        bountiesModule.claimBounty(bountyId, msg.sender);
    }

    // Function to verify and process bounty payment
    function verifyBounty(uint256 bountyId) external {
        require(authorizer.hasRole(authorizer.VERIFIER_ROLE(), msg.sender), "Not authorized");
        bountiesModule.verifyBounty(bountyId, msg.sender);
        // Process payment via the PaymentProcessor
        paymentProcessor.processPayments(bountyId);
    }

    // Function to deposit tokens into FundingManager
    function depositTokens(uint256 amount) external {
        fundingManager.deposit(amount, msg.sender);
    }

    // Function to withdraw funds from FundingManager
    function withdrawTokens(uint256 amount) external {
        fundingManager.withdraw(amount, msg.sender);
    }
}
