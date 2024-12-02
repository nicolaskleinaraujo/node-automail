# Automatic Newsletter Sender for Kindle
 ![MIT License](https://img.shields.io/badge/license-MIT-blue)
 <br>
   <img src="./frontend/public/home-page.png" alt="Print Home Page" width="700">.
   ### Demo app: https://node-automail.nkportfolio.tech
# About
 This API downloads an e-mail through an IMAP server and converts it into an EPUB file.
 The EPUB file is send to your "Send to Kindle" account, which can be read through an Kindle device.
 The frontend basically shows the step-by-step guide on how to set up your Kindle account.
 The Cron Job is set up to run every day at 12pm.

# Working on
 - [x] ~~Logging~~
 - [ ] Support for [TabNews](https://www.tabnews.com.br)

# Stacks 
  ### Back-end
  - TypeScript
  - Node.js
  - Express
  - IMAP
  - Resend
  - Epub-gen
  - Prisma
  - MySQL
  - Zod
  - Node-cron
  
  ### Front-end
  - TypeScript
  - React
  - shadcn/ui
  - Tailwind
  - Axios
  - Lucide React
  - React-toastify

  ### Implantation
  - Website: https://node-automail.nkportfolio.tech
  - API: https://node-automail-api.nkportfolio.tech

# Run Locally
  ### Prerequisites
  - Node.js installed
  - NPM installed
  - GIT installed
  - MySQL installed
  
  ### Step-by-step
  ```bash
  # Clone Repository
  git clone https://github.com/nicolaskleinaraujo/node-automail.git

  # Enter "backend" folder
  cd node-automail/backend

  # Install depedencies
  npm install

  # Create a .env file with the following values | Check the .env.exemple file if nedeed
  PORT="your port"
  ORIGIN_URL="frontend url"
  RESEND_KEY="your resend secret key"
  IMAP_EMAIL="your email"
  IMAP_PASSWORD="your email password"
  SERVER_PASSWORD="server password used to force newsletter"
  DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE"

  # Run the following prisma command
  npx prisma db push

  # Run the application
  npm run dev

  # Enter "frontend" folder
  cd ../frontend

  # Install depedencies
  npm install

  # Create a .env file with the following values | Check the .env.exemple file if nedeed
  VITE_API_URL="backend url"

  # Run the application
  npm run dev

  # Check the following URL on your browser
  http://localhost:5173
  ```

  # Author
   Nicolas Klein Faria de Araujo <br>
   https://nkportfolio.tech
