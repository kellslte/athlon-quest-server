# **AthlonQuest**

AthlonQuest is a robust Learning Management System (LMS) designed for **ACA** students, known as **Athlons**. It provides a comprehensive platform for managing courses, tracking video progress, facilitating real-time chat, submitting and grading assignments, managing leaderboards, and downloading certificates. Built with modern technologies like **Node.js**, **MongoDB**, **PostgreSQL**, and **Redis**, it empowers students, facilitators, and administrators with efficient tools for education.

## **Features**
- **User Roles:** Supports roles for students, facilitators, and administrators.
- **Course & Lesson Management:** Facilitators can create and manage courses and lessons.
- **Video Watch Progress:** Tracks the progress of students as they watch video lessons.
- **Assignments:** Facilitators can create assignments, and students can submit them.
- **Leaderboard:** Shows top-performing students using Redis for fast data retrieval.
- **Real-Time Chat:** Facilitates interaction among students and facilitators using Socket.IO.
- **Certificate Generation:** Students can download completion certificates in PDF format.
- **File Uploads:** Upload assignments and other resources to **Cloudinary**.

---

## **Table of Contents**
1. [Installation](#installation)
2. [Environment Variables](#environment-variables)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
5. [Deployment to AWS](#deployment-to-aws)
6. [External Dependencies](#external-dependencies)
7. [GitHub Actions CI/CD](#github-actions-ci-cd)
8. [Contributing](#contributing)
9. [About the Author](#about-the-builder)

---

## **Installation**

To run AthlonQuest locally, follow the steps below:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kellslte/athlon-quest-server.git
   cd athlon-quest-server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory based on the variables listed below.

---

## **Environment Variables**

The application uses the following environment variables. Add these to your `.env` file:

```bash
# General Settings
NODE_ENV=development
PORT=3000
JWT_SECRET=your_jwt_secret

# PostgreSQL for relational data
PG_HOST=your_postgresql_host
PG_USER=your_postgresql_user
PG_PASSWORD=your_postgresql_password
PG_DATABASE=your_postgresql_database

# MongoDB for non-relational data
MONGO_URI=mongodb://your_mongodb_host:your_mongodb_port/your_database_name

# Redis for leaderboard
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password

# Cloudinary for file uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## **Database Setup**

### **PostgreSQL Setup**

1. Install PostgreSQL and create a new database:
   ```bash
   CREATE DATABASE athlonlearn;
   ```
2. Run migrations (if applicable) to set up your schema:
   ```bash
   npm run migrate
   ```

### **MongoDB Setup**

1. Install MongoDB and start a MongoDB instance, or use a MongoDB cloud service.
2. Connect your instance using the `MONGO_URI` in the `.env` file.

### **Redis Setup**

1. Install Redis locally or use a cloud Redis service.
2. Configure Redis credentials using the `REDIS_HOST`, `REDIS_PORT`, and `REDIS_PASSWORD` in the `.env` file.

---

## **Running the Application**

Once all dependencies and databases are set up, run the application locally:

```bash
npm start
```

You can now access the app at `http://localhost:4000`.

---

## **Deployment to AWS**

### **Step 1: Set Up EC2 Instance**

1. **Create an EC2 instance**:
   - Select an instance with the appropriate size and operating system (Ubuntu is recommended).
   - Configure security groups to allow inbound traffic on port 3000.

2. **SSH into the EC2 instance**:
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-public-ip
   ```

### **Step 2: Install Node.js and Git**

```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm
sudo apt install git
```

### **Step 3: Clone the Project and Install Dependencies**

```bash
git clone https://github.com/kellslte/athlon-quest-server.git
cd athlon-quest-server
npm install
```

### **Step 4: Set Up Databases and Environment Variables**

1. Set up MongoDB, PostgreSQL, and Redis (similar to the local setup).
2. Add your `.env` file on the EC2 instance.

### **Step 5: Run the Application**

Start the app using a process manager like `pm2` for production:

```bash
npm install -g pm2
pm2 start npm -- start
```

### **Step 6: Set Up Nginx (Optional)**

If you want to serve your app through a domain name:

1. Install Nginx:
   ```bash
   sudo apt install nginx
   ```
2. Configure Nginx to proxy requests to your Node.js app.

---

## **External Dependencies**

1. **Redis**: Used for the leaderboard. Make sure Redis is installed and running locally or use a cloud Redis instance.
2. **MongoDB**: Handles non-relational data like chat messages and video progress.
3. **PostgreSQL**: Stores relational data, such as user information, assignments, and courses.
4. **Cloudinary**: Used for file uploads (e.g., assignment submissions).
5. **Socket.IO**: Enables real-time communication for the chat functionality.
6. **PDFKit**: Used to generate certificates in PDF format.

---

## **GitHub Actions CI/CD**

To automate testing and deployment, GitHub Actions can be configured in a `.github/workflows/ci.yml` file:

```yaml
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm install
    - run: npm test
    - run: npm run lint
```

This configuration runs tests and lints your code every time you push to the main branch.

---

## **Contributing**

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add new feature'
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## **About the Author**

This application was built by Favour Max-Oti, a software developer and educator at ACA, passionate about developing educational tools that empower students to learn efficiently and effectively.

- **Website**: [kellslte.com.ng](#)
- **GitHub**: [github.com/kellslte](#)
- **Twitter**: [@Mr_kellscian](#)

---

This README provides a full walkthrough for the setup, configuration, deployment, and use of **AthlonQuest**. It can be customized further as your app evolves and more features are added.