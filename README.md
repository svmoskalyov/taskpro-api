# <img src="./assets/images/image.png" width="30" height="30"> [TaskPro](https://svmoskalyov.github.io/taskpro/welcome) API
> TaskPro backend

### 📝 About
API for [TaskPro](https://svmoskalyov.github.io/taskpro/welcome) project. The MongoDB database is used, and the Mongoose library is used to connect to the database. Used HTTP request methods (GET, POST, PUT, PATCH, DELETE). Authentication using JWT and user authorization using email and password is done. The user's password is stored in hashed form. The CORS mechanism is implemented. Only an authorized user can use the application. Each user creates his own tasks that only he can see. Developed API documentation.


### 🛠 Technologies stack
- **utilities:** VS Code, Postman, MongoDB Compass
- **server environment:** Node.js
- **framework:** Express.js
- **library:** Mongoose
- **database:** MongoDB
- **modules:** morgan, cors, joi, multer, morgan, uuid, jsonwebtoken, jimp, cloudinary, multer-storage-cloudinary, dotenv, bcrypt, nodemon, eslint, swagger-ui-express
- **cloud services:** Cloudinary, Render


### 🔗 Links
- [Frontend](https://svmoskalyov.github.io/taskpro/welcome)
- [API docs](https://taskpro-api.onrender.com/api-docs/)

---

![image](https://github.com/svmoskalyov/taskpro-api/assets/107481840/2ddce262-b83a-46b1-9ada-bdd77ca6c684)

---

### If cloned, it is necessary for the project to work
1. Make sure you have an LTS version of Node.js installed on your computer.
   [Download and install](https://nodejs.org/en/) if needed
2. Install the basic project dependencies with the `npm i` command
3. Create file **.env** (for example the **.env.template**), with your data
4. Commands for developers:
- `npm start` &mdash; server start in production mode
- `npm run dev` &mdash; start the server in development mode
- `npm run lint` &mdash; run a code check run with eslint, must run before each PR and fix all linter errors
- `npm lint:fix` &mdash; the same linter check, but with automatic fixes for simple errors
5. API is available at [http://localhost:5000](http://localhost:5000)
