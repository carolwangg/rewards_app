export interface RedeemInfo{
    customer_id: string,
    reward_id: string,
    reward_name: string,
}

export interface AddPointInfo{
    customer_id: string,
}

export const isRedeemInfo = (data: Object) => {
    return "customer_id" in data && "reward_id" in data;
}

export const isAddPointInfo = (data: Object) => {
    return "customer_id" in data && !("reward_id" in data);
}

export interface CustomerCard{
  id: string,
  name: string,
  description: string, 
  image_url: string,
  contactInfo: string,
  colour: string,
  points: number,
  text_colour: string
}

export interface Card{
  id: string,
  name: string,
  description: string, 
  image_url: string,
  contactInfo: string,
  colour: string,
  textColour: string
}

export interface Reward{
  id: string,
  name: string,
  description: string, 
  image_url: string,
  points: number,
  business_id: string,
  longitude: number | null, 
  latitude: number | null
} 

export interface CustomerReward{
  id: string,
  name: string,
  description: string, 
  image_url: string,
  points: number,
  business_id: string,
  longitude: number, 
  latitude: number,
  distance: number | '?'
}

export function rewardToCustomerReward(reward: Reward, customerLocation: Location){
  let distance: string | '?' = '?';
  console.log('reward.latitude:'+reward.latitude)
   console.log('reward.longitude:'+reward.longitude)
    console.log('customerLocation.latitude:'+customerLocation.latitude)
     console.log('customerLocation.longitude:'+customerLocation.longitude)
  if (reward.latitude && reward.longitude && customerLocation.latitude && customerLocation.longitude){
    distance = measure(reward.latitude, reward.longitude, customerLocation.latitude, customerLocation.longitude).toFixed(2);
  }
  return {
    id: reward.id,
    name: reward.name,
    description: reward.description, 
    image_url: reward.image_url,
    points: reward.points,
    business_id: reward.business_id,
    longitude: reward.longitude, 
    latitude: reward.latitude,
    distance: distance,
  } 
}

// function measure(lat1: number, lon1: number, lat2: number, lon2: number): number{  // generally used geo measurement function
//     var R = 6378.137; // Radius of earth in KM
//     var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
//     var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
//     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//     Math.sin(dLon/2) * Math.sin(dLon/2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     var d = R * c;
//     return d; // km
// }

function measure(lat1: number, lon1: number, lat2: number, lon2: number): number {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  console.log("measure:"+d);
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180)
}

export const defaultCustomerReward = {
  id: "reward_0",
  name: "Temp name",
  description: "Temp desc", 
  image_url: "",
  points: 10,
  business_id: "id_0",
  latitude: 43.5423, 
  longitude: -79.6580,
  distance: 1.2
}

export function generateDefaultCustomerRewards(count: number){
  const rewards = []
  for (let i = 0; i < count; i++){
    const reward = {
      id: i,
      name: defaultCustomerReward.name + " " + i,
      description: defaultCustomerReward.description,
      image_url: defaultCustomerReward.image_url,
      points: defaultCustomerReward.points,
      business_id: defaultCustomerReward.business_id,
      latitude: defaultCustomerReward.latitude + 0.005*i,
      longitude: defaultCustomerReward.longitude + 0.002*i,
      distance: defaultCustomerReward.distance
    }
    rewards.push(reward)
  }
  return rewards
}

export interface Customer{
  id: string,
  name: string,
  email: string,
  latitude: number | null,
  longitude: number | null,
  country: string
  street_address: string | null,
  image_url: string | null,
}

export interface Business{
  id: string,
  name: string,
  description: string | null, 
  email: string,
  country: string,
  latitude: number | null,
  longitude: number | null,
  street_address: string | null,  
  business_email: string | null,
  business_phone: string | null,
  image_url: string | null,
  banner_url: string | null,
  rating: number | null,
}

export const EMPTY_CUSTOMER: Customer = {
  id: "",
  name: "",
  email: "",
  latitude: null,
  longitude: null,
  country: "",
  street_address: "",
  image_url: "",
}

export const EMPTY_BUSINESS: Business = {
  id: "",
  name: "",
  description: "",
  email: "",
  country: "",
  latitude: null,
  longitude: null,
  street_address: "",  
  business_email: "",
  business_phone: "",
  image_url: "",
  banner_url: "",
  rating: null,
}

export const EMPTY_CARD: Card = {
  id: "",
  name: "",
  description: "", 
  image_url: "",
  contactInfo: "",
  colour: "",
  textColour: ""
}

export const EMPTY_REWARD: Reward = {
  id: "",
  name: "",
  description: "", 
  image_url: "",
  points: 0,
  business_id: "",
  longitude: null, 
  latitude: null,
}

export const defaultBusiness = {
  id: "user_0",
  name: "Temp name",
  description: "Temp desc", 
  email: "",
  location: "1234 Temp Location Street",
  latitude: 43.5423, 
  longitude: -79.6580,
  country: "Canada",
  rating: 4.3,
  language: "en",
  street_address: "1234 Temp Location Street",  
  business_email: "business@example.com",
  business_phone: "1234567890",
  image_url: "",
  banner_url: "",
}

export function generateDefaultBusinesses(count: number){
  const businesses = []
  for (let i = 0; i < count; i++){
    const business = {
      id: "user_"+i,
      name: defaultBusiness.name + " " + i,
      description: defaultBusiness.description,
      image_url: defaultBusiness.image_url,
      email: defaultBusiness.email,
      location: defaultBusiness.location,
      latitude: defaultBusiness.latitude + 0.005*i,
      longitude: defaultBusiness.longitude + 0.002*i,
      country: defaultBusiness.country,
      rating: defaultBusiness.rating + 0.1,
      language: defaultBusiness.language,
      street_address: defaultBusiness.street_address,  
      business_email: defaultBusiness.business_email,
      business_phone: defaultBusiness.business_phone,
      banner_url: defaultBusiness.banner_url,
    }
    businesses.push(business)
  }
  return businesses
}


export interface MapBusiness{
  id: string,
  name: string,
  description: string, 
  latitude: number,
  longitude: number,
  rewardCount: number
}

export function generateDefaultMapBusinesses(count: number){
  const businesses = []
  for (let i = 0; i < count; i++){
    const business = {
      id: "user_"+i,
      name: defaultBusiness.name + " " + i,
      description: defaultBusiness.description,
      latitude: defaultBusiness.latitude + 0.005*i,
      longitude: defaultBusiness.longitude + 0.002*i,
      rewardCount: i
    }
    businesses.push(business)
  }
  return businesses
}

export type APIResponse = 
{
  message: string,
  user: object | string
}

export class Location {
  latitude: number;
  longitude: number;
  constructor(latitude: number, longitude: number){
    this.latitude = latitude;
    this.longitude = longitude;
  }
  toStringCustom(){
    return `(${this.latitude}, ${this.longitude})`;
  }
}