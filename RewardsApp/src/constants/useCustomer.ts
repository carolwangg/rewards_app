import { useState, useCallback } from "react";

export function useCustomer(initial: {
  id: string;
  name: string;
  email: string;
}) {
  const [id] = useState(initial.id);
  const [name, setName] = useState(initial.name);
  const [email, setEmail] = useState(initial.email);

  // Custom setters (optional, but recommended)
  const updateName = useCallback((newName: string) => {
    // do validations / transformations here
    setName(newName);
  }, []);

  const updateEmail = useCallback((newEmail: string) => {
    // example: lowercase email automatically
    setEmail(newEmail.toLowerCase());
  }, []);

  return {
    id,
    name,
    email,

    // expose both raw and custom setters:
    setName: updateName,
    setEmail: updateEmail,
  };
}