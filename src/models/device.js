class Device {
  constructor({ id, name, serial_number, user_id }) {
    this.id = id;
    this.name = name;
    this.serial_number = serial_number;
    this.user_id = user_id;
  }
}

module.exports = Device;
