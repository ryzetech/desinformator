import { createOAuthAPIClient, createRestAPIClient } from "masto";
import { fragments } from "./fragments.js";
import dotenv from "dotenv";

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

const postNow = async () => {
  const status = await client.v1.statuses.create({
    status: generateStatus(),
  });
  console.log(status);
}

postNow();
