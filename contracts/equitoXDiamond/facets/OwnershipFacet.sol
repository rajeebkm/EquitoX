// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import { IERC173 } from "../interfaces/IERC173.sol";
import { LibDiamond } from "../libraries/LibDiamond.sol";

contract OwnershipFacet is IERC173 {

    function transferOwnership(address _newOwner) external override {
        LibDiamond.enforceIsContractOwner();
        LibDiamond.setContractOwner(_newOwner);
        address _previousContractOwner = LibDiamond.contractOwner();
        emit OwnershipTransferred(_previousContractOwner, _newOwner);
    }

    function owner() external view override returns (address owner_) {
        owner_ = LibDiamond.contractOwner();
    }

}
