import { useState, useCallback } from "react";
import { Card } from "./interfaces";
import { CardHook } from "./hooks";

export function useCard(card: Card): CardHook{
  const [id] = useState(card.id);
  const [name, setName] = useState(card.name);
  const [description, setDescription] = useState(card.description);
  const [image_url, setimage_url] = useState(card.image_url);
  const [contactInfo, setContactInfo] = useState(card.contactInfo);
  const [colour, setColour] = useState(card.colour);
  const [textColour, setTextColour] = useState(card.textColour);

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
    setimage_url(newimage_url);
  }, []);

  const updateContactInfo = useCallback((newContactInfo: string) => {
    // example: lowercase email automatically
    setContactInfo(newContactInfo);
  }, []);

  const updateColour = useCallback((newColour: string) => {
    // example: lowercase email automatically
    setColour(newColour);
  }, []);

  const updateTextColour = useCallback((newTextColour: string) => {
    // example: lowercase email automatically
    setTextColour(newTextColour);
  }, []);

  const getCard = useCallback((): Card => {
    return {
      id: id,
      name: name,
      description: description,
      image_url: image_url,
      contactInfo: contactInfo,
      colour: colour,
      textColour: textColour,
    }
  }, []);

  return {
    id,
    name,
    description,
    image_url,
    contactInfo,
    colour,
    textColour,
    // expose both raw and custom setters:
    setName: updateName,
    setDescription: updateDescription,
    setimage_url: updateimage_url,
    setContactInfo: updateContactInfo,
    setColour: updateColour,
    setTextColour: updateTextColour,
    getCard: getCard
  };
}