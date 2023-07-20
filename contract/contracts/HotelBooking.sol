import "hardhat/console.sol";
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract HotelBooking {
    
    struct Room {
        bool available;
        uint256 price;
    }
    
    mapping(uint256 => Room) public rooms;
    
    function addRoom(uint256 roomId, uint256 price) public {
        require(rooms[roomId].price == 0, "Room already exists");
        rooms[roomId] = Room(true, price);
    }
    
    function bookRoom(uint256 roomId) public {
        require(rooms[roomId].available, "Room not available");
        rooms[roomId].available = false;
    }
    
    function updateRoomAvailability(uint256 roomId, bool available) public {
        require(rooms[roomId].price > 0, "Room does not exist");
        rooms[roomId].available = available;
    }
    
    function isRoomAvailable(uint256 roomId) public view returns(bool) {
        require(rooms[roomId].price > 0, "Room does not exist");
        return rooms[roomId].available;
    }
}
