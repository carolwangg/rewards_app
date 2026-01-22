import { useState, useCallback } from "react";
import { Business } from "./interfaces";
import { BusinessHook } from "./hooks";

export function useBusiness(business: Business): BusinessHook {
  const [id] = useState(business.id);
  const [name, setName] = useState(business.name);
  const [email, setEmail] = useState(business.email);
  const [description, setDescription] = useState(business.description);
  const [country, setCountry] = useState(business.country);
  const [longitude, setLongitude] = useState(business.longitude);
  const [latitude, setLatitude] = useState(business.latitude);
  const [streetAddress, setStreetAddress] = useState(business.street_address);
  const [businessEmail, setBusinessEmail] = useState(business.business_email);
  const [businessPhone, setBusinessPhone] = useState(business.business_phone);
  const [imageUrl, setImageUrl] = useState(business.image_url);
  const [bannerUrl, setBannerUrl] = useState(business.banner_url);

  // Custom setters (optional, but recommended)
  const updateName = useCallback((newName: string) => {
    // do validations / transformations here
    setName(newName);
  }, []);

  const updateEmail = useCallback((newEmail: string) => {
    // example: lowercase email automatically
    setEmail(newEmail.toLowerCase());
  }, []);

  const updateDescription = useCallback((newDescription: string) => {
    // example: lowercase email automatically
    setDescription(newDescription);
  }, []);

  const updateCountry = useCallback((newCountry: string) => {
    // example: lowercase email automatically
    setCountry(newCountry);
  }, []);

  const updateLongitude = useCallback((newLongitude: number) => {
    setLongitude(newLongitude);
  }, []);

  const updateLatitude = useCallback((newLatitude: number) => {
    setLatitude(newLatitude);
  }, []);

  const updateStreetAddress = useCallback((newStreetAddress: string) => {
    setStreetAddress(newStreetAddress);
  }, []);

  const updateBusinessEmail = useCallback((newBusinessEmail: string) => {
    setBusinessEmail(newBusinessEmail);
  }, []);

  const updateBusinessPhone = useCallback((newBusinessPhone: string) => {
    setBusinessPhone(newBusinessPhone);
  }, []);

  const updateImageUrl = useCallback((newImageUrl: string) => {
    setImageUrl(newImageUrl);
  }, []);

  const updateBannerUrl = useCallback((newBannerUrl: string) => {
    setBannerUrl(newBannerUrl);
  }, []);

  const populateBusiness = useCallback((business: Business) =>{
    updateName(business.name),
    updateEmail(business.email),
    business.description? updateDescription(business.description): null,
    updateCountry(business.country),
    business.longitude? updateLongitude(business.longitude): null,
    business.latitude? updateLatitude(business.latitude): null,
    business.street_address? updateStreetAddress(business.street_address): null,
    business.business_email? updateBusinessEmail(business.business_email): null,
    business.business_phone? updateBusinessPhone(business.business_phone): null,
    business.image_url? updateImageUrl(business.image_url): null,
    business.banner_url? updateBannerUrl(business.banner_url): null
  }, [])
  const getBusiness = useCallback((): Business=>{
    return {
      id: id,
      name: name,
      email: email,
      description: description,
      country: country,
      longitude: longitude,
      latitude: latitude,
      street_address: streetAddress,
      business_email: businessEmail,
      business_phone: businessPhone,
      image_url: imageUrl,
      banner_url: bannerUrl,
      rating: 5
    }
  }, [])
  return {
    id,
    name,
    email,
    description,
    country,
    longitude,
    latitude,
    streetAddress,
    businessEmail,
    businessPhone,
    imageUrl,
    bannerUrl,

    // expose both raw and custom setters:
    setName: updateName,
    setEmail: updateEmail,
    setDescription: updateDescription,
    setCountry: updateCountry,
    setLongitude: updateLongitude,
    setLatitude: updateLatitude,
    setStreetAddress: updateStreetAddress,
    setBusinessEmail: updateBusinessEmail,
    setBusinessPhone: updateBusinessPhone,
    setImageUrl: updateImageUrl,
    setBannerUrl: updateBannerUrl,
    getBusiness: getBusiness,
    populate: populateBusiness,
  };
}