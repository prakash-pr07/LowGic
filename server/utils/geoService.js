import NodeGeocoder from 'node-geocoder';


const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

export const getCoordinatesFromCity = async (city) => {
  const res = await geocoder.geocode(city);
  if (!res.length) throw new Error("Invalid city");
  return {
    latitude: res[0].latitude,
    longitude: res[0].longitude,
  };
};

