import { CosmosClient } from '@azure/cosmos';

// Setting up connection with the DB.
const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
export const client = new CosmosClient({ endpoint, key });



// export default client; 