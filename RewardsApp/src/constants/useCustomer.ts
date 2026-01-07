import { useState, useCallback } from "react";
import { Customer } from "./interfaces";

export function useCustomer(customer: Customer)  {
  const [id] = useState(customer.id);
  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [latitude, setLatitude] = useState(customer.latitude);
  const [longitude, setLongitude] = useState(customer.longitude);
  const [country, setCountry] = useState(customer.country);
  const [street_address, setStreetAddress] = useState(customer.street_address);
  const [image_url, setImageUrl] = useState(customer.image_url);
  // Custom setters (optional, but recommended)
  const updateName = useCallback((newName: string) => {
    // do validations / transformations here
    setName(newName);
  }, []);

  const updateEmail = useCallback((newEmail: string) => {
    // example: lowercase email automatically
    setEmail(newEmail.toLowerCase());
  }, []);

  const updateLatitude = useCallback((newLatitude: number) => {
    setLatitude(newLatitude);
  }, []);

  const updateLongitude = useCallback((newLongitude: number) => {
    setLongitude(newLongitude);
  }, []);

  const updateCountry = useCallback((newCountry: string) => {
    // example: lowercase email automatically
    setCountry(newCountry);
  }, []);

  const updateStreetAddress = useCallback((newStreetAddress: string) => {
    setStreetAddress(newStreetAddress);
  }, []);

  const updateImageUrl = useCallback((newImageUrl: string) => {
    setImageUrl(newImageUrl);
  }, []); 

  return {
    id,
    name,
    email,
    latitude,
    longitude,
    country,
    street_address,
    image_url,

    // expose both raw and custom setters:
    setName: updateName,
    setEmail: updateEmail,
    setLatitude: updateLatitude,
    setLongitude: updateLongitude,
    setCountry: updateCountry,
    setStreetAddress: updateStreetAddress,
    setImageUrl: updateImageUrl
  };
}