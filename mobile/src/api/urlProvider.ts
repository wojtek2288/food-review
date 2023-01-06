// const BASE_URL = 'https://foodreviewbackend3.azurewebsites.net';
const BASE_URL = 'https://fuzzy-ties-wink-95-160-156-157.loca.lt';


export const queryUrl = (path: string) => `${BASE_URL}/api/query/FoodReview.Core.Contracts.Mobile.${path}`;
export const commandUrl = (path: string) => `${BASE_URL}/api/command/FoodReview.Core.Contracts.Mobile.${path}`;

export const authUrl = `${BASE_URL}/auth/connect/token`;
