
module.exports = async function () {
  const { models: { Availability, Building, Property, Reservation } } = require('marvic-api/helpers/models');

  //seed the demo data
  let building = await Building.findOne();
  if(building == null){
    //building
    await Building.create({ city: 'Dubai' });
    await Building.create({ city: 'Montreal' });
  }
 
  let property = await Property.findOne();
  if(property == null){
  //property
  await Property.create({ building_id: 1, title: 'Unit 1', property_type: '1bdr', amenities: '{WiFi,Parking}'});
  await Property.create({ building_id: 1, title: 'Unit 1', property_type: '2bdr', amenities: '{WiFi,Tennis table}'});
  await Property.create({ building_id: 1, title: 'Unit 1', property_type: '3bdr', amenities: '{Garden}'});
  await Property.create({ building_id: 2, title: 'Unit 1', property_type: '1bdr', amenities: '{Garden,Pool}'});
  }

  let reservations = await Reservation.findOne();
  if(reservations == null){
    //reservations
    await Reservation.create({ check_in: '2021-05-01', check_out: '2021-05-10', property_id: 1});
    await Reservation.create({ check_in: '2021-06-01', check_out: '2021-06-03', property_id: 1});
    await Reservation.create({ check_in: '2021-06-01', check_out: '2021-06-07', property_id: 2});
  }

  let availability = await Availability.findOne();
  if(availability == null){
    //availability
    await Availability.create({ property_id: 1, start_date: '2021-07-01', end_date: '2021-07-20', is_blocked: true});
  }

};
