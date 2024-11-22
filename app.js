import { createRestAPIClient } from "masto";
import dotenv from "dotenv";
import cron from "node-cron";
import { fragments } from "./fragments.js";

dotenv.config();

const getRandomFragment = (key) => {
  const fragment = fragments[key];
  return fragment[Math.floor(Math.random() * fragment.length)];
}

const generateStatus = () => {
  const first = getRandomFragment("first");
  const second = getRandomFragment("second");
  const third = getRandomFragment("third");
  return `${first}\n${second}\n${third}`;
}

const client = createRestAPIClient({
  url: "https://botsinbox.net/",
  accessToken: process.env.TOKEN,
});

const makePost = async () => {
  const status = await client.v1.statuses.create({
    status: generateStatus(),
  });
  console.log(status);
}

cron.schedule("0 * * * *", makePost);