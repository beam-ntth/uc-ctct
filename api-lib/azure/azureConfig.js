import { CosmosClient } from '@azure/cosmos';

// Setting up connection with the DB.
const endpoint = process.env.NEXT_PUBLIC_COSMOS_ENDPOINT;
const key = process.env.NEXT_PUBLIC_COSMOS_KEY;
export const client = new CosmosClient({ endpoint, key });