import { useState, useCallback } from "react";
import { Card } from "./interfaces";
export function useCard(card: Card) {
  const [id] = useState(card.id);
  const [name, setName] = useState(card.name);
  const [description, setDescription] = useState(card.description);
  const [image_url, setimage_url] = useState(card.image_url);
  const [contactInfo, setContactInfo] = useState(card.contactInfo);
  const [colour, setColour] = useState(card.colour);

  // Custom setters (optional, but recommended)
  const updateName = useCallback((newName: string) => {
    // do validations / transformations here
    setName(newName);
  }, []);

  const updateDescription = useCallback((newDescription: string) => {
    // example: lowercase email automatically
    setDescription(newDescription);
  }, []);

  const updateimage_url = useCallback((newimage_url: string) => {
    // example: lowercase email automatically
    setimage_url(newimage_url.toLowerCase());
  }, []);

  const updateContactInfo = useCallback((newContactInfo: string) => {
    // example: lowercase email automatically
    setContactInfo(newContactInfo.toLowerCase());
  }, []);

  const updateColour = useCallback((newColour: string) => {
    // example: lowercase email automatically
    setColour(newColour.toLowerCase());
  }, []);

  return {
    id,
    name,
    description,
    image_url,
    contactInfo,
    colour,

    // expose both raw and custom setters:
    setName: updateName,
    setDescription: updateDescription,
    setimage_url: updateimage_url,
    setContactInfo: updateContactInfo,
    setColour: updateColour,
  };
}