import { SITE_URL } from "@/constants/constants";
import { CardHook, LocationHook } from "@/constants/hooks";
import { APIResponse, Business, Reward } from "@/constants/interfaces";

export const pingBackend = async (): Promise<boolean> => {
    try {
      const backendUrl = `${SITE_URL}`;
      const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      });
      const json = await response.json();
      return json.message === "Server Up";
    } catch (error) {
      throw error;
    }
};

export const addPointsToCustomerCard = async (cardId: string, customerId: string, points: number) => {
  try {
    const backendUrl = `${SITE_URL}/customers/${customerId}/cards/${cardId}/add-points`;
    const response = await fetch(backendUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      points: points,
      }),
    });
    const json = await response.json();
    console.log("API response from addPoints:" + json);
    return json;
  } catch (error) {
    throw error;
  } 
};


export const updateReward = async (reward: Reward) => {
    try {
      const backendUrl = `${SITE_URL}/rewards/update`;
      const formData = new FormData();
      formData.append("business_id", reward.business_id);
      formData.append("reward_id", reward.id);
      formData.append("name", reward.name);
      formData.append("points", reward.points.toString());
      formData.append("description", reward.description);
      formData.append("image", {
        uri: reward.image_url,
        name: "reward",
        type: "image/jpeg,jpg,png,heif"
      } as any);
      const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: formData
      });

      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      throw error;
    } 
}

export const updateRewardImage = async (rewardId: string, image_url: string) => {
  try {    
    const backendUrl = `${SITE_URL}/rewards/${rewardId}/updateImage`;
    const formData = new FormData();
    formData.append("image", {
      uri: image_url,
      name: "card",
      type: "image/jpeg,jpg,png,heif"
    } as any);
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: formData
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error updating reward in updateRewardImage()")
    throw error;
  }
}

export const redeemReward = async (cardId: string, customerId: string, rewardId: string) => {
  try {
    const backendUrl = `${SITE_URL}/rewards/redeem`;
    const response = await fetch(backendUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cardId: cardId,
      customerId: customerId,
      rewardId: rewardId,
      }),
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  } 
}

export const getRewards = async () => {
  try {
    const backendUrl = `${SITE_URL}/rewards`;
    console.log("backendUrl:"+backendUrl);
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  } 
}


export const getCustomer = async (userId: string) => {
  try {
    const backendUrl = `${SITE_URL}/customers/${userId}`;
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  } 
}

export const getCustomerRewards = async (userId: string) => {
  try {
    const backendUrl = `${SITE_URL}/customers/${userId}/rewards`;
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  } 
}

export const getBusinessRewards = async (userId: string) => {
  try {
    const backendUrl = `${SITE_URL}/businesses/${userId}/rewards`;
    console.log("backendUrl:"+backendUrl)
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  } 
}

export const addReward = async (reward: Reward) => {
    try {
        const backendUrl = `${SITE_URL}/rewards/create`;
        const formData = new FormData();
        formData.append("name", reward.name);
        formData.append("points", reward.points.toString());
        formData.append("description", reward.description);
        formData.append("business_id", reward.business_id);
        formData.append("image", {
          uri: reward.image_url,
          name: "reward",
          type: "image/jpeg,jpg,png,heif"
        } as any);
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: formData
        });
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        throw error;
    } 
};

export const getCustomerCards = async (userId: string) => {
  try {
    const backendUrl = `${SITE_URL}/customers/${userId}/cards`;
    console.log(backendUrl);
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  } 
}

export const getCustomerCard = async (userId: string, cardId: string) => {
  try {
    const backendUrl = `${SITE_URL}/customers/${userId}/cards/${cardId}`;
    console.log(backendUrl);
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  } 
}

export const getCustomerCardRewards = async (customerId: string, cardId: string) => {
  try {
    const backendUrl = `${SITE_URL}/customers/${customerId}/cards/${cardId}/rewards`;
    console.log(backendUrl);
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    });
    console.log("response for rewards");
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  }
}

export const getBusiness = async (userId: string) => {
  try {
    const backendUrl = `${SITE_URL}/businesses/${userId}`;
    console.log(backendUrl);
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json', 
    },
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  } 
}

export const addCustomerCard = async (userId: string, businessId: string) => {
  console.log("userId:"+userId);
  console.log("businessId:"+businessId);
  const tempUserId = "user_3631ytWKA51u1CLDkuuppqtu8LZ";
  console.log(JSON.stringify({
        businessId: businessId,
      }))
  try {
    const backendUrl = `${SITE_URL}/customers/${tempUserId}/cards/create`;
    console.log(backendUrl);
    const response = await fetch(backendUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        businessId: businessId,
      }),
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  } 
}


export const addCustomer = async (customerId: string, email: string, country: string) => {
  try {
    const backendUrl = `${SITE_URL}/customers/create`;
    console.log('backendUrl:'+backendUrl);
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: customerId,
        email: email,
        country: country,
      }),
    });
    return response;
  } catch (error) {
    console.log("error creating customer in addCustomer()")
    throw error;
  } 
};


export const updateCustomer = async (customer: any) => {
    try {
      const backendUrl = `${SITE_URL}/customers/${customer.id}/update`;
      const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: customer.id,
        name: customer.name,
        email: customer.email,
        longitude: customer.longitude,
        latitude: customer.latitude,
        country: customer.country,
        street_address: customer.street_address,
        image_url: customer.image_url
        }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      throw error;
    } 
}

export const updateCustomerLocation = async (customerId: string, location: LocationHook) => {
    try {
      const backendUrl = `${SITE_URL}/customers/${customerId}/updateLocation`;
      const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: location.location.latitude,
        longitude: location.location.longitude,
        street_address: location.streetAddress,
        }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      throw error;
    } 
}


export const updateCustomerImage = async (id: string, image_url: string) => {
    try {
      const backendUrl = `${SITE_URL}/customers/${id}/updateImage`;
      const formData = new FormData();
      formData.append("image", {
        uri: image_url,
        name: "customer_image",
        type: "image/jpeg,jpg,png,heif"
      } as any);
      const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: formData
      });

      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      throw error;
    } 
}


export const updateBusinessImage = async (id: string, image_url: string) => {
    try {
      const backendUrl = `${SITE_URL}/businesses/${id}/updateImage`;
      const formData = new FormData();
      formData.append("image", {
        uri: image_url,
        name: "business_image",
        type: "image/jpeg,jpg,png,heif"
      } as any);
      const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: formData
      });
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      throw error;
    } 
}


export const updateBusinessBanner = async (id: string, image_url: string) => {
    try {
      const backendUrl = `${SITE_URL}/businesses/${id}/updateBanner`;
      const formData = new FormData();
      formData.append("image", {
        uri: image_url,
        name: "business_banner",
        type: "image/jpeg,jpg,png,heif"
      } as any);
      const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: formData
      });

      const json = await response.json();
      return json;
    } catch (error) {
      throw error;
    } 
}

export const addBusiness = async (businessId: string, email: string, country: string, name: string) => {
  try {
    const backendUrl = `${SITE_URL}/businesses/create`;
    console.log('backendUrl:'+backendUrl);
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        businessId: businessId,
        email: email,
        country: country,
        name: name
      }),
    });
    return response;
  } catch (error) {
    console.log("error creating business in addBusiness()")
    throw error;
  } 
};

export const updateBusiness = async (id: string, business: Business) => {
    try {
      const backendUrl = `${SITE_URL}/businesses/${id}/update`;
      const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        name: business.name,
        description: business.description,
        email: business.email,
        country: business.country,
        longitude: business.longitude,
        latitude: business.latitude,
        street_address: business.street_address,
        business_email: business.business_email,
        business_phone: business.business_phone      
        }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      throw error;
    } 
}

export const getCard = async (businessId: string) => {
  try {
    const backendUrl = `${SITE_URL}/cards/${businessId}`;
    console.log(backendUrl);
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  } 
}

export const getReward = async (rewardId: string) => {
  try {
    const backendUrl = `${SITE_URL}/rewards/${rewardId}`;
    console.log(backendUrl);
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  } 
}

export const updateCard = async (id: string, card: CardHook) => {
    try {
      const backendUrl = `${SITE_URL}/cards/${id}/update`;
      const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: card.name,
        description: card.description,
        contactInfo: card.contactInfo,
        colour: card.colour,
        textColour: card.textColour
        }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      throw error;
    } 
}

export const updateCardImage = async (cardId: string, image_url: string) => {
  try {    
    console.log("image_url:"+image_url)
    const backendUrl = `${SITE_URL}/cards/${cardId}/updateImage`;
    const formData = new FormData();
    formData.append("image", {
      uri: image_url,
      name: "card",
      type: "image/jpeg,jpg,png,heif"
    } as any);
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: formData
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("error updating card in updateCardImage()")
    throw error;
  }
}


export const addCard = async (businessId: string, name: string) => {
  try {
    const backendUrl = `${SITE_URL}/cards/create`;
    console.log('backendUrl:'+backendUrl);
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        businessId: businessId,
        name: name,
      }),
    });
    const json = await response.json();
    console.log("json in addCard(): "+json);
    return response;
  } catch (error) {
    console.log("error creating business in addCard()")
    throw error;
  } 
};

export const getUserTypeEmail = async (email: string): Promise<APIResponse> => {
  try {
    const backendUrl = `${SITE_URL}/emails/${email}`;
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  } 
}

export const getUserType = async (userId: string): Promise<APIResponse> => {
  try {
    const backendUrl = `${SITE_URL}/users/${userId}`;
    const response = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    throw error;
  } 
}

export const deleteClerkUser = async (userId: string) => {
  try {
    const backendUrl = `${SITE_URL}/users/${userId}/delete`;
    const response = await fetch(backendUrl, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) { 
    throw error;
  } 
}