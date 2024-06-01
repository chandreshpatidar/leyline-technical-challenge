# LeyLine - Technical Challenge

This technical challenge involves implementing a settlement process between two parties, Party A and Party B. The system handles iterative negotiation of settlement amounts by Party A, along with approvals or objections from Party B. The process ensures that all changes and responses are reflected on Party A's and Party B's interface.

## Live Demo

Click [here](https://leyline-technical-challenge-production.up.railway.app/) to see a demo

Please check a [loom video](https://www.loom.com/share/22d03f2b39284eeab8c76c2d13b3b6f6?sid=77cc9ff4-01d2-46b7-aa2c-73aa4ba5443e) to see how application works

To see real time updated data, please open the Party A and Party B in same browser in a device.

## Instructions to run the application on local server

First, Install the dependencies to run the application

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech stack 

1. Next.Js (14.2.3)
2. Tailwind CSS
3. Shadcn UI
4. Socket.io (Use to get modified data in real time)
5. Zustand (State management)
6. Local Storage (Use to store data)
7. Lucide Icons
8. Luxon (Use to format date)


## Features

###  Settlement Submission and Negotiation

1. Allow Party A to submit an initial settlement amount
2. Enable Party A to modify and resubmit the settlement amount any number of times until Party B responds
3. Allow Party B to dispute or agree to the submitted amount, but Party B cannot change the response once submitted. If disputed, Party A can modify and resubmit the amount. The process repeats until the agreement is reached. (After desputed the amount by Party B, Party A can submit a new amount and can modify amount until Party B dispute or agree)
4. Party A’s interface display Party B’s current response (dispute or agreement), and Party B's interface display the amount submitted by Party A
5. The system transition to a settled state, Once Party B agrees

### Handling Modifications and Responses

1. Add a mechanism to detect if a response from Party B is made during the modification process by Party A upon Party A's submission and show alert box to refresh the page
2. Add a mechanism to automatic updates on Party B's interface whenever Party A makes changes (No need to refresh the page manually)


### Additional Points

1. As a frontend developer, I've used a local storage to store the messages and other required data
2. I've created a UI in the form of chat board to keep it more attractive (and keep all the settlement history between Party A and Party B) instead of creating a simple box which shows only latest data
3. As a frontend developer, I setup the socket server in the same application (Next.Js) instead of creating a new backend repo
4. I've deployed this application on [Railway](https://railway.app/), as vercel [don't support sockets](https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections) directly


### Things to improve

1. Add backend and database to keep data long live
2. To make UI more user friendly, we can add here a tooltip messages in form, to show why button is disabled
3. Add a logic to scroll chat body to latest message, currently user need to scroll manually
4. Can break down party-a and party-b page's code into sub components to keep it more readable (eg. can keep business logic and UI components in separate files)