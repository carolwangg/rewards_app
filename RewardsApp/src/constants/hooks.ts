import { useState } from "react"
import { Business, Card, Customer, Location } from "./interfaces";

export type CardHook = {
    id: string,
    name: string,
    description: string,
    image_url: string,
    contactInfo: string,
    colour: string,
    textColour: string,
    // expose both raw and custom setters:
    setName: (name: string) => void,
    setDescription: (description: string) => void,
    setimage_url: (image_url: string) => void,
    setContactInfo: (contactInfo: string) => void,
    setColour: (colour: string) => void,
    setTextColour: (textColour: string) => void
    getCard: () => Card
}

export class LocationHook{
    location: Location;
    setLocation: (location: Location) => void;
   
    streetAddress: string;
    setStreetAddress: (street_address: string) => void
    constructor(og_latitude: number, og_longitude: number, og_street_address?: string){
        const street_address = og_street_address? og_street_address: "";
        [this.location, this.setLocation] = useState(new Location(og_latitude, og_longitude));
        [this.streetAddress, this.setStreetAddress] = useState(street_address);
    }
    toString(){
        return `(${this.location.latitude}, ${this.location.longitude})`;
    }
}

export type BusinessHook = {
    id: string,
    name: string,
    email: string,
    description: string | null,
    country: string,
    longitude: number | null,
    latitude: number | null,
    streetAddress: string | null,
    businessEmail: string | null,
    businessPhone: string | null,
    imageUrl: string | null,
    bannerUrl: string | null,

    setName: (name: string) => void,
    setEmail: (email: string) => void,
    setDescription: (description: string) => void,
    setCountry: (country: string) => void,
    setLongitude: (longitude: number) => void,
    setLatitude: (latitude: number) => void,
    setStreetAddress: (streetAddress: string) => void,
    setBusinessEmail: (businessEmail: string) => void,
    setBusinessPhone: (businessPhone: string) => void,
    setImageUrl: (imageUrl: string) => void,
    setBannerUrl: (bannerUrl: string) => void,
    getBusiness: () => Business,
    populate: (business: Business) => void,
}


export type CustomerHook = {
  id: string,
  name: string,
  email: string,
  latitude: number | null,
  longitude: number | null,
  country: string
  street_address: string | null,
  image_url: string | null,

  setName: (name: string) => void,
  setEmail: (email: string) => void,
  setLatitude: (latitude: number) => void,
  setLongitude: (longitude: number) => void,
  setCountry: (country: string) => void,
  setStreetAddress: (street_address: string) => void,
  setImageUrl: (image_url: string) => void,
  populate: (customer: Customer) => void
}