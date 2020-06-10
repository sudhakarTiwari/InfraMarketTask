function ParkingLot(size) {
  this.lot_size = size;
  this.free_slots = [];
  this.parked_cars = [];

  let index = 0;
  while (index < this.lot_size) {
    this.free_slots[index] = index + 1;
    index++;
  }
}

ParkingLot.prototype.entry = function(vehicle) {
  if (this.free_slots.length > 0) {
    let vehicleExists = this.parked_cars.filter(
      item => item.reg_no === vehicle.reg_no
    );

    if (vehicleExists.length === 0) {
      vehicle["park_slot"] = this.free_slots.pop();
      this.parked_cars.push(vehicle);
    } else {
      console.log("Duplicate registered car.");
    }
  } else {
    console.log("No parking available");
  }
};

ParkingLot.prototype.exit = function(reg_no) {
  let vehicle = this.parked_cars.filter(item => item.reg_no === reg_no);

  if (vehicle.length === 0) {
    console.log("Vehicles with registration " + reg_no + " not found. ");
  } else {
    let vehicleIndex = this.parked_cars.findIndex(
      item => item.reg_no === reg_no
    );

    this.free_slots.push(vehicle.park_slot);
    this.parked_cars.splice(vehicleIndex, 1);
    console.log("Vehicle with registration " + reg_no + " exited from lot.");
  }
};

ParkingLot.prototype.getVehiclesByColor = function(color) {
  let vehicles = this.parked_cars
    .filter(item => item.color === color)
    .map(item => item.reg_no);
  if (vehicles.length === 0)
    console.log("No vehicles with color " + color + " found.");
  else console.log("Vehicles with color " + color + ": " + vehicles.join(", "));
};

ParkingLot.prototype.getSlot = function(reg_no) {
  let slot = this.parked_cars
    .filter(item => item.reg_no === reg_no)
    .map(item => item.park_slot);
  slot.length
    ? console.log("Slot number of " + reg_no + ": " + slot.join(","))
    : console.log("Vehicles with registration " + reg_no + " not found. ");
};

ParkingLot.prototype.getSlotsByColor = function(color) {
  let slots = this.parked_cars
    .filter(item => item.color === color)
    .map(item => item.park_slot);
  if (slots.length === 0)
    console.log("No slots with vehicle color " + color + " found.");
  else
    console.log(
      "Slots of vehicles with color " + color + ": " + slots.join(", ")
    );
};

ParkingLot.prototype.getFreeSlots = function() {
  console.log(this.free_slots.join(", "));
};

function Vehicle(reg_no, color) {
  this.reg_no = reg_no;
  this.color = color;
}

let parking_lot = new ParkingLot(10);

let vehicle1 = new Vehicle("DL123456", "yellow");
let vehicle2 = new Vehicle("DL324672", "red");
let vehicle3 = new Vehicle("DL123343", "red");
let vehicle4 = new Vehicle("DL234456", "black");
let vehicle5 = new Vehicle("DL123450", "blue");

parking_lot.entry(vehicle1);
parking_lot.entry(vehicle2);
parking_lot.entry(vehicle3);
parking_lot.entry(vehicle4);
parking_lot.entry(vehicle5);
parking_lot.entry(vehicle1);

console.log("===================================");

// Query 1
parking_lot.getVehiclesByColor("red");
parking_lot.getVehiclesByColor("green");

console.log("===================================");

// Query 2
parking_lot.getSlot("DL324672");
parking_lot.getSlot("DL234456");
parking_lot.getSlot("MH234456");

console.log("===================================");

// Query 3
parking_lot.getSlotsByColor("red");
parking_lot.getSlotsByColor("green");

console.log("===================================");

// Query 4
parking_lot.getFreeSlots();

console.log("===================================");

// Query 5
parking_lot.exit("DL324672");
parking_lot.exit("DL324672");
