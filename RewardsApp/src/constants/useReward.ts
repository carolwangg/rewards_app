import { useState, useCallback } from "react";
import { Reward } from "./interfaces";

export function useReward(initial: {
  reward: Reward
}) {
  const [id] = useState(initial.reward.id);
  const [name, setName] = useState(initial.reward.name);
  const [description, setDescription] = useState(initial.reward.description);
  const [points, setPoints] = useState(initial.reward.points);
  const [image_url, setimage_url] = useState(initial.reward.image_url);

  // Custom setters (optional, but recommended)
  const updateName = useCallback((newName: string) => {
    // do validations / transformations here
    setName(newName);
  }, []);

  const updateDescription = useCallback((newDescription: string) => {
    // example: lowercase email automatically
    setDescription(newDescription);
  }, []);

  const updatePoints = useCallback((newPoints: number) => {
    // example: lowercase email automatically
    setPoints(newPoints);
  }, []);

  const updateimage_url = useCallback((newimage_url: string) => {
    // example: lowercase email automatically
    setimage_url(newimage_url);
  }, []);

  return {
    id,
    name,
    description,
    points,
    image_url,

    // expose both raw and custom setters:
    setName: updateName,
    setDescription: updateDescription,
    setPoints: updatePoints,
    setimage_url: updateimage_url    
  };
}