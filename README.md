# <img src="./assets/images/image.png" width="24" height="24"> TaskPro API (backend)


## 📝 About
API for [TaskPro](https://solusblade.github.io/ITD-node-front-project/welcome) project. The MongoDB database is used, and the Mongoose library is used to connect to the database. Used HTTP request methods (GET, POST, PUT, PATCH, DELETE). Authentication using JWT and user authorization using email and password is done. The user's password is stored in hashed form. The CORS mechanism is implemented. Only an authorized user can use the application. Each user creates his own tasks that only he can see. Developed API documentation.


## 🛠 Technologies stack
- **utilities:** VS Code, Postman, MongoDB Compass
- **server environment:** Node.js
- **framework:** Express.js
- **library:** Mongoose
- **database:** MongoDB
- **modules:** morgan, cors, joi, multer, morgan, uuid, jsonwebtoken, jimp, cloudinary, multer-storage-cloudinary, dotenv, bcrypt, nodemon, eslint, swagger-ui-express
- **cloud services:** Cloudinary, Render


## 🔗 Links
- [Frontend](https://solusblade.github.io/ITD-node-front-project/welcome)
- [Backend](https://taskpro-api.onrender.com/)
- [API docs](https://taskpro-api.onrender.com/api-docs/)


---
### If cloned, it is necessary for the project to work
1. Make sure you have an LTS version of Node.js installed on your computer.
   [Download and install](https://nodejs.org/en/) if needed.
2. Install the basic project dependencies with the `npm i` command.
3. Commands for developers:

- `npm start` &mdash; server start in production mode
- `npm run start:dev` &mdash; start the server in development mode
- `npm run lint` &mdash; run a code check run with eslint, must run before each PR and fix all linter errors
- `npm lint:fix` &mdash; the same linter check, but with automatic fixes for simple errors
4. Go to [http://localhost:5000](http://localhost:5000) in your browser. This
   page will automatically reload after saving changes to project files.
