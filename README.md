# School/Collage/University Management System [Edu Admin Backend]

The Edu Management System is a comprehensive backend solution designed to manage various aspects of a Educational institute, including student enrollment, course management, and faculty administration. The system supports multiple roles such as Super Admin, Admin, Faculty, and Student, each with specific permissions and functionalities. Key features include secure authentication, role-based access control, and a robust API for managing university operations. Built with TypeScript, Node.js, Express.js, and MongoDB, the project ensures scalability and security.

## Developer

- [@Rana Arju](https://your-portfolio-link.com)

## Live API URL

<https://eduadmin.vercel.app />

# or

```
https://eduadmin.vercel.app/
```

## Video Explanation

[![Edu Management System](https://res.cloudinary.com/demo/image/upload/v1734604071/university_management.png)](https://youtu.be/your-video-link)

## Project Requirements:
    [Requirement](https://docs.google.com/document/d/1i0rA5IoravnEskmMqcaAEvIIya_kYPIr-13RJO2wyhI/edit?usp=sharing)

## ER Diagram
![ER Diagram](https://res.cloudinary.com/db8l1ulfq/image/upload/v1735302369/erdiagram_f4wcqx.png)
### Technologies Used

- **TypeScript**: Strong typing and enhanced developer experience.
- **Node.js**: Runtime environment for JavaScript-based backend.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB & Mongoose**: NoSQL database with an ORM for schema validation and CRUD operations.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```

DATABASE_URL =

BCRYPT_SALT_ROUNDS= 
DEFAULT_PASSWORD = 

JWT_ACCESS_TOKEN= 
REFRESH_TOKEN= 

JWT_ACCESS_EXPIRES = 
REFRESH_ACCESS_EXPIRES =

RESET_LIVE_URL =
EMAIL_USER=  
EMAIL_PASSWORD= 

CLOUDINARY_API_KEY=  
CLOUDINARY_cLOUDE_NAME= 
CLOUDINARY_API_SECRET=  
```

## Admin Login Credentials

```
email: admin@gmail.com
password: admin1234
```

## Installation

Install the project with npm

### Prerequisites

- Node
- Git
- npm

### Check versions

```bash
node --version
git --version
```

## Run Locally

Clone the project

```bash
    git clone https://github.com/rana-arju/Edu-Admin-backend.git
```

Go to the project directory

```bash
    cd Edu-Admin-backend
```

Install dependencies

```bash
    npm install
```

Start the server

```bash
    npm run dev
```

## API Endpoints

#### Register User

```http
    POST /api/auth/register
```

### User Example

Request Body:

```
{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securepassword"
}
```

#### Login User

```http
    POST /api/auth/login
```

#### Get All Courses

```http
    GET /api/courses
```

#### Add Course (Admin only)

```http
    POST /api/courses
```

### Course Example

Request Body:

```
{
    "title": "Introduction to Computer Science",
    "description": "Basic concepts of computer science."
}
```

#### Delete Course (Admin only)

```http
    DELETE /api/courses/:id
```

#### Update Course (Admin only)

```http
    PATCH /api/courses/:id
```

### Course Example

Request Body:

```
{
    "title": "Advanced Computer Science",
    "description": "In-depth study of computer science."
}
```

## Folder Structure 📂

```bash
├── README.md
├── tsconfig.json
├── .env
├── package-lock.json
├── package.json
├── src
│   ├── App.ts
│   ├── server.ts
│   └── app
│      ├── config
│      │    └── index.ts
│      ├── builder
│      │    └── QueryBuilder.ts
│      ├── errors
│      │    └── error all files
│      ├── middleware
│      │    └── auth, globalErrorHandler, notFound, and validationRequest files
│      └── modules
│         └── Admin
│         │    ├── admin.controller.ts
│         │    ├── admin.service.ts
│         │    ├── admin.route.ts
│         └── Auth
│               ├── auth.controller.ts
│               ├── auth.schema.ts
│               ├── auth.interface.ts
│               ├── auth.service.ts
│               ├── auth.utils.ts
│               ├── auth.validation.ts
│               └── auth.route.ts
│         └── Course
│               ├── course.controller.ts
│               ├── course.schema.ts
│               ├── course.interface.ts
│               ├── course.service.ts
│               ├── course.validation.ts
│               └── course.route.ts
│      └── routes
│         └── index.ts
│      └── utils
│         └── catchAsync.ts and sendResponse.ts
│
├── vercel.json
├── eslint.config.mjs
├── .gitignore
├── .prettierigmore
└── .prettierrc
```

---

# Packages Used 📦

| Used Package List |
| :---------------: |
|    express js     |
|     mongoose      |
|    typescript     |
|        JWT        |
|   jsonWebToken    |
|      bcrypt       |
|        Zod        |
|       cors        |
|      dotenv       |
|     prettier      |
|   eslint\_\_js    |

---