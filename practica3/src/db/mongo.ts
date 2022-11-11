import {
  ObjectId,
  MongoClient,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";

import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { SlotSchema } from "./schemas.ts";

const env = config();


env.MONGO_USR;
env.MONGO_PWD;

const client = new MongoClient();

await client.connect(
  `mongodb+srv://Carlos:holabuenas@cluster0.slujba9.mongodb.net/SlotStore?authMechanism=SCRAM-SHA-1`,
);

const db = client.database("SlotStore");
console.info("Connected to database");

export const slotsCollection = db.collection<SlotSchema>("Slots");
