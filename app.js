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

const refreshFields = async () => {
  const fields = await client.v1.accounts.updateCredentials({
    fieldsAttributes: [
      {
        name: 'Anzahl an Fragmenten',
        value: (fragments.first.length + fragments.second.length + fragments.third.length).toString(),
      },
      {
        name: 'Anzahl an Möglichkeiten',
        value: (fragments.first.length * fragments.second.length * fragments.third.length).toString(),
      },
      {
        name: 'Programmiert von',
        value: '@finn@furry.energy',
      },
      {
        name: 'GitHub',
        value: 'https://github.com/ryzetech/desinformator',
      },
      {
        name: 'Letzter Neustart',
        value: new Date().toLocaleDateString("de-DE") + " " + new Date().toLocaleTimeString("de-DE"),
      },
    ]
  });
}

refreshFields();

cron.schedule("0 */2 * * *", makePost);