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
}

export interface Card{
  id: string,
  name: string,
  description: string, 
  image_url: string,
  contactInfo: string,
  colour: string,
}

export interface Reward{
  id: string,
  name: string,
  description: string, 
  image_url: string,
  points: number,
  business_id: string
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
  distance: number
}

export const defaultCustomerReward = {
  id: 1,
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
  latitude: number,
  longitude: number,
  country: string
  street_address: string,
  image_url: string,
}

export interface Business{
  id: string,
  name: string,
  description: string, 
  email: string,
  country: string,
  latitude: number,
  longitude: number,
  street_address: string,  
  business_email: string,
  business_phone: string,
  image_url: string,
  banner_url: string,
  rating: number,
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