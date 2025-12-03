import { useState, useCallback } from "react";
import { Business } from "./interfaces";

export function useBusiness(initial: {
  business: Business
}) {
  const [id] = useState(initial.business.id);
  const [name, setName] = useState(initial.business.name);
  const [email, setEmail] = useState(initial.business.email);
  const [description, setDescription] = useState(initial.business.description);
  const [phoneNumber, setPhoneNumber] = useState(initial.business.phoneNumber);
  const [location, setLocation] = useState(initial.business.location);
  
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
  
  const updatePhoneNumber = useCallback((newPhoneNumber: string) => {
    // example: lowercase email automatically
    setPhoneNumber(newPhoneNumber);
  }, []);

  const updateLocation = useCallback((newLocation: string) => {
    // example: lowercase email automatically
    setLocation(newLocation);
  }, []);


  return {
    id,
    name,
    email,
    description,
    phoneNumber, 
    location,

    // expose both raw and custom setters:
    setName: updateName,
    setEmail: updateEmail,
    setDescription: updateDescription,
    setPhoneNumber: updatePhoneNumber,
    setLocation: updateLocation
  };
}