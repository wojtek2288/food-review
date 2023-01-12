const BASE_URL = 'https://foodreviewbackend3.azurewebsites.net';

export const queryUrl = (path: string) => `${BASE_URL}/api/query/FoodReview.Core.Contracts.Mobile.${path}`;
export const commandUrl = (path: string) => `${BASE_URL}/api/command/FoodReview.Core.Contracts.Mobile.${path}`;

export const authUrl = `${BASE_URL}/auth/connect/token`;
