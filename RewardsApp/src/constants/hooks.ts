import { useState } from "react";

export class Card{
  id: number;
  setId: Function;
  name: string;
  setName: Function;
  description: string;
  setDescription: Function;
  image_url: string;
  setimage_url: Function;
  phoneNumber: string;
  setPhoneNumber: Function;
  points: number;
  setPoints: Function;

  constructor(id: number, name: string, description: string, image_url: string, phoneNumber: string, points: number){
    [this.id, this.setId] = useState(id);
    [this.name, this.setName] = useState(name);
    [this.description, this.setDescription] = useState(description);
    [this.image_url, this.setimage_url] = useState(image_url);
    [this.phoneNumber, this.setPhoneNumber] = useState(phoneNumber);
    [this.points, this.setPoints] = useState(points);
  }

  updateId(newId: number){
    this.setId(newId);
  }

  updateName(newName: string){
    this.setName(newName);
  }

  updateDescription(newDescription: string){
    this.setDescription(newDescription);
  }

  updateimage_url(newimage_url: string){
    this.setimage_url(newimage_url);
  }

  updatePhoneNumber(newPhoneNumber: string){
    this.setPhoneNumber(newPhoneNumber);
  }

  updatePoints(newPoints: number){
    this.setPoints(newPoints);
  }

}


export class Reward{
  id: number;
  setId: Function;
  name: string;
  setName: Function;
  description: string;
  setDescription: Function;
  image_url: string;
  setimage_url: Function;
  points: number;
  setPoints: Function;
  businessId: number;
  setBusinessId: Function;

  constructor(id: number, name: string, description: string, image_url: string, phoneNumber: string, points: number, businessId: number){
    [this.id, this.setId] = useState(id);
    [this.name, this.setName] = useState(name);
    [this.description, this.setDescription] = useState(description);
    [this.image_url, this.setimage_url] = useState(image_url);
    [this.points, this.setPoints] = useState(points);
    [this.businessId, this.setBusinessId] = useState(businessId);
  }

  updateId(newId: number){
    this.setId(newId);
  }

  updateName(newName: string){
    this.setName(newName);
  }

  updateDescription(newDescription: string){
    this.setDescription(newDescription);
  }

  updateimage_url(newimage_url: string){
    this.setimage_url(newimage_url);
  }

  updatePoints(newPoints: number){
    this.setPoints(newPoints);
  }

  updateBusinessId(newBusinessId: number){
    this.setBusinessId(newBusinessId);
  }
  
}



export class Customer{
  id: number;
  setId: Function;
  name: string;
  setName: Function;
  email: string;
  setEmail: Function;

  constructor(id: number, name: string, email: string){
    [this.id, this.setId] = useState(id);
    [this.name, this.setName] = useState(name);
    [this.email, this.setEmail] = useState(email);
  }

  updateId(newId: number){
    this.setId(newId);
  }

  updateName(newName: string){
    this.setName(newName);
  }

  updateEmail(newEmail: string){
    this.setEmail(newEmail);
  }
}