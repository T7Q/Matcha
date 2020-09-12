Create a file .env in backend/config folder.
Mine looks like this

```
# database configuration
DB_USER=postgres
DB_NAME=matcha-1
DB_PWD=123456

# server configuration
PORT=5000

# JWT secret
JWT_SECRET=somesecret


# mail configuration
EMAIL=your_email
EMAIL_PWD=password

```
You should configure your postgres database on your system in accordance with your database credentials.

Then in the root folder run command `npm run init`. It will install all dependencies in all folders.

And then you can run command `npm run dev`. It will start a server.
