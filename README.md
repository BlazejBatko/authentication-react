# authentication-react-ts

> ## **FEATURES**

1. Registration Form that creates new user in mongodb database (via api to backend)
2. Login Form (authentication)
3. Protected Routes (with react-router-v6) that are dependent on logged user roles (for example only user with admin role can view admin component)
4. Providing secure access to protected resources (Users component in this exact example) using JSON Web Tokens. 
5. Fetching data with axios interceptors
6. Persistent user login (remember this device functionality - user being logged out after refresh token expires)
7. Form and toggle input saved in local storage (custom hooks)

> ## GOAL


**goal** of this project is to create **good practices**, react, authentication code reference that can be used in future projects.

> ## SHOWCASE
https://user-images.githubusercontent.com/61236659/222983344-4d4f6ff4-fec3-452b-9bbf-0134161640de.mp4
> ### DEMO INSTALLATION

1. clone this repo url

2. ```js
   npm install
   
   npm run dev
   ```

> ### BACKEND INSTALLATION 

1.  clone this [repo](https://github.com/gitdagray/mongo_async_crud)

2. create .env file in root folder with 

   ```
   DATABASE_URI = "<your mongodb connection link>"
   ACCESS_TOKEN_SECRET= <token>
   ```

3. ```js
   npm install
   
   npm start 
   
   // (server should start on localhost:3500 and thats the url we are fetching in our client aplication)
   ```

> ## CREDITS

Project was created during [React Login, Registration and Authentication](https://www.youtube.com/playlist?list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd) Course ❤️

