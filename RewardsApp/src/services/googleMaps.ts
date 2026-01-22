import { Location } from "@/constants/interfaces";

export const reverseGeocodeLocation = async (location: Location) => {
  try {
    const backendUrl = `https://geocode.googleapis.com/v4beta/geocode/location?location.latitude=${location.latitude}&location.longitude=${location.longitude}`;
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json',
        "X-Goog-Api-Key": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY? process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY: ""

    },
    })
    const json = await response.json();
    return json.results;
  } catch (error) {
    throw error;
  } 
}

export const geolocate = async (streetAddress: string) => {
  try {
    const backendUrl = `https://geocode.googleapis.com/v4beta/geocode/address/${encodeURIComponent(streetAddress)}`;
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json',
        "X-Goog-Api-Key": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY? process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY: ""
    },
    })
    const json = await response.json();
    console.log(json);
    return json.results;
  } catch (error) {
    throw error;
  } 
}

export const autocompleteSuggestions = async (streetAddress: string, num: number) => {
    try {
      const backendUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(streetAddress)}&regionCode=ca&languageCode=en&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(backendUrl,
        {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/json',
            },
        }
      );
      const json = await response.json();
      if (json.status === 'OK' && Array.isArray(json.predictions))
        return json.predictions.slice(0, num);
      else  return [];
    } catch (e) {
      return []
    }
}