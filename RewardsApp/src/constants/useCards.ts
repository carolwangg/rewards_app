import { useState, useCallback } from "react";
import { Card } from "./interfaces";
export function useCard(initial: {card: Card
}) {
  const [id] = useState(initial.card.id);
  const [name, setName] = useState(initial.card.name);
  const [description, setDescription] = useState(initial.card.description);
  const [image_url, setimage_url] = useState(initial.card.image_url);
  const [contactInfo, setContactInfo] = useState(initial.card.contactInfo);
  const [colour, setColour] = useState(initial.card.colour);

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