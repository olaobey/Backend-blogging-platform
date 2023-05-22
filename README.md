# **Backend Blogging Platform API**

This is a RESTful API for a Blogging Platform that allows users to create, read, update, and delete blog posts. The API supports user authentication and authorization, enabling users to create and manage their own posts.

## **Features**

- User authentication using JWT (JSON Web Tokens)
- CRUD operations for blog posts
- Authorization to ensure users can only manage their own posts
- MongoDB for storing and retrieving blog post data
- Versioning of the API using a URL or header parameter
- Error handling with appropriate error messages and status codes
- Security measures against common threats like XSS, and CSRF attacks
- Performance optimization for scalability and handling a large number of requests

## **Getting Started**

### **Prerequisites**

Before you can run the API, you will need to have the following installed:

- Node.js(v14 or later)

- Mongodb atlas

### **Installing**

Clone the repository to your local machine.

In the root directory, create a .env file and add the
following environment variables:

1. Clone the repository to your local machine.
2. Install the required dependencies with npm install
3. In the root directory, create a **`.env`** file based on the **`.env.example`** file, and update the values as needed with the following variables

- MONGO_DB= **`mongodb url`**
- PORT= **`specified number`**
- LIMIT= **`pagination limit`**
- MAX_LIMIT= **`maximum pagination limit`**
- JWT_SECRET= **`jwt secret`**
- NODE_ENV= **`stage of the project`**

4. Run **`npm install`** to install the required packages.
5. The API server will start running on http://localhost:3000. You can now send HTTP requests to the API endpoints.

## **Running**

To start the API, **`run npm start dev`**.

## **API Documentation**

To generate API documentation using Postman, you can utilize the built-in feature called Postman Documentation. Here's a step-by-step guide on how to create API documentation using Postman:

1. Launch Postman and open the collection that contains your API requests.

2. Ensure that your requests are organized within folders to represent different endpoints or functionalities.

3. Click on the "..." (ellipsis) button next to the collection name and select "View in Web".

4. In the Postman web view, you will see your collection and its requests. Click on the "Create a Documentation" button located on the top-right corner of the page.

5. Give your documentation a name and description. You can also select a cover image and customize the appearance.

6. In the next step, you can choose to add requests, folders, and examples to your documentation. Select the requests and folders that you want to include in the documentation. You can also add descriptions, code snippets, and responses for each request.

7. Once you have selected the requests and configured the details, click on the "Create Documentation" button.

8. Postman will generate the documentation based on your selected requests and configurations. You will be redirected to the documentation page.

9. On the documentation page, you will see a sidebar with all the requests and folders. Clicking on each request will display detailed information, including the request URL, headers, parameters, and responses.

10. You can customize the documentation further by adding additional sections, including an introduction, authentication details, and other relevant information. You can also reorder the sections and add custom Markdown content.

11. Once you are satisfied with the documentation, you can share it with others by clicking on the "Share" button located on the top-right corner of the page. Postman provides various sharing options, including generating a public link or embedding the documentation in your website.

## **E-Contributing**

If you'd like to contribute to the Project Name, follow these steps:

1. Fork the repository using this link: [GitHub](https://github.com/olaobey/Backend-blogging-platform.git)
2. Create a new branch for your changes
3. Make your changes and commit them to your branch
4. Push your branch to your forked repository
5. Create a pull request to merge your changes into the main repository

## **API Endpoints**

## **Base_Url**

[BASE_URL](https://blogging-api-1a6x.onrender.com/api/v1)

### **Authentication**

- POST /auth/register: `Register a new user.`
- POST /auth/login: `Log in and generate a JWT token.`
- GET /refresh: `Refresh expired tokens`
- POST /logout: `Log out to clear cookies if exist`

### **Blog Posts**

- GET /blogs/getBlogs: `Get a list of all blog posts.`
- GET /blogs/topBlog: `Get top blog posts.`
- GET /blog/get/:id: `Get a specific blog post by ID.`
- POST blogs/addBlog: `Create a new blog post.`
- PUT /blogs/update/:id: `Update an existing blog post by ID.`
- DELETE /blogs/remove/:id: `Delete a blog post by ID.`

### **Categories**

- POST /blogs/create: `Create a new blog category`
- PUT /blogs/update/:id: `Update a blog category`
- GET /blogs/categories: `Get a list of all categories.`
- GET /blog/categories/:id: `Get a specific category by ID.`
- DELETE /blogs/remove/:id: `Delete a blog category by ID.`

### **Comments**

- POST /comments: `Create a new comment.`
- DELETE /comments/:id: `Delete a comment by ID.`

### **Profile**

- PUT /updateProfile/:id: `Update a profile.`
- GET /GetProfile/:id `Get a profiles.`
- Delete /deleteProfile/:id `Delete a profile.`

## **Built With**

- bcrypt
- cookie-parser
- cors
- date-fns
- dotenv
- express
- express-pino-logger
- express-paginate
- express-rate-limit
- express-validator
- jsonwebtoken
- mongoose
- mongoose-unique-validator
- pino
- pino-http
- uuid
- helmet

### **Devdependency**

- nodemon
- pino-pretty

## **Security Considerations**

Ensure proper secure of environment variables, especially sensitive information like the JWT secret and database credentials.
Implement appropriate input validation and sanitization to protect against common security threats like SQL injection and XSS attacks.
Use secure coding practices to prevent vulnerabilities and regularly update dependencies to address known security issues.
Implement measures like CSRF tokens or appropriate headers to protect against CSRF attacks.

## **Credits**

The Project Name was created by **`Worksquare`**.

## **Authors**

The author of the project is **`Ajeigbe Olaoluwa Samuelo`**.

## **License**

This project is licensed under the MIT License
