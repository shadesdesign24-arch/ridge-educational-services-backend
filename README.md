<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" />
</p>

<h1 align="center">🎓 Ridge Educational Services — Backend API</h1>

<p align="center">
  <b>A robust, production-ready REST API powering the Ridge Educational Services platform.</b><br/>
  Built with Express.js, TypeScript, PostgreSQL & MongoDB for a seamless educational consultancy experience.
</p>

---

## 📋 Table of Contents

- [✨ Overview](#-overview)
- [🏗️ Architecture](#️-architecture)
- [🗂️ Project Structure](#️-project-structure)
- [⚙️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [📡 API Endpoints](#-api-endpoints)
- [🗄️ Database Models](#️-database-models)
- [📧 Email Integration](#-email-integration)
- [🔑 Authentication](#-authentication)
- [👥 Roles & Permissions](#-roles--permissions)
- [🤝 Contributing](#-contributing)

---

## ✨ Overview

Ridge Educational Services is an **educational consultancy platform** that helps students find eligible colleges based on their cutoff marks. The platform includes:

- 🏫 **College Management** — Admins can add/edit/delete colleges with courses, cutoff marks, and detailed fee structures
- 👨‍💼 **Employee Dashboard** — Employees check student eligibility, book admissions, and manage CRM follow-ups
- 📋 **Consultation System** — Students request free/paid consultations; leads are assigned to employees
- 📊 **Bulk Upload** — Import college data from Excel spreadsheets
- 📧 **Email Notifications** — Automatic email alerts for new consultation requests via Gmail SMTP

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     CLIENT (React)                       │
└──────────────────┬───────────────────────────────────────┘
                   │ HTTP / REST API
┌──────────────────▼───────────────────────────────────────┐
│              EXPRESS.JS SERVER (Port 5000)                │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │  Auth Routes │  │ Admin Routes │  │ Employee Routes│  │
│  └──────┬──────┘  └──────┬───────┘  └───────┬────────┘  │
│         │                │                   │           │
│  ┌──────▼──────────────▼───────────────────▼────────┐  │
│  │              Controllers & Middleware              │  │
│  └──────┬──────────────┬───────────────────┬────────┘  │
│         │                │                   │           │
│  ┌──────▼──────┐  ┌──────▼───────┐  ┌───────▼────────┐  │
│  │  PostgreSQL  │  │   MongoDB    │  │  Nodemailer    │  │
│  │  (Sequelize) │  │  (Mongoose)  │  │  (Gmail SMTP)  │  │
│  └─────────────┘  └──────────────┘  └────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## 🗂️ Project Structure

```
backend/
├── 📄 .env                          # Environment variables (not committed)
├── 📄 .gitignore                    # Git ignore rules
├── 📄 package.json                  # Dependencies & scripts
├── 📄 tsconfig.json                 # TypeScript configuration
└── 📁 src/
    ├── 📄 index.ts                  # 🚀 App entry point & server setup
    ├── 📁 config/
    │   └── 📄 db.ts                 # PostgreSQL & MongoDB connections
    ├── 📁 controllers/
    │   ├── 📄 adminController.ts    # College CRUD, Employee, Bulk Upload
    │   ├── 📄 authController.ts     # Login & Registration
    │   └── 📄 employeeController.ts # Eligibility, Booking, Follow-ups
    ├── 📁 middlewares/
    │   └── 📄 authMiddleware.ts     # JWT Authentication Guard
    ├── 📁 models/
    │   ├── 📁 pg/                   # PostgreSQL Models (Sequelize)
    │   │   ├── 📄 Booking.ts        # Admission bookings
    │   │   ├── 📄 College.ts        # College details + fee structure
    │   │   ├── 📄 Consultation.ts   # Consultation requests & leads
    │   │   ├── 📄 CutoffMarks.ts    # Course-wise cutoff marks
    │   │   └── 📄 User.ts          # Admin & Employee accounts
    │   └── 📁 mongo/                # MongoDB Models (Mongoose)
    │       └── 📄 FollowUp.ts       # Student CRM follow-ups
    ├── 📁 routes/
    │   ├── 📄 adminRoutes.ts        # /api/admin/* routes
    │   ├── 📄 authRoutes.ts         # /api/auth/* routes
    │   ├── 📄 employeeRoutes.ts     # /api/employee/* routes
    │   └── 📄 guestRoutes.ts        # /api/* public routes
    └── 📁 utils/
        └── 📄 sendEmail.ts          # Gmail SMTP email utility
```

---

## ⚙️ Tech Stack

| Technology | Purpose |
|:---:|:---|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **TypeScript** | Type-safe development |
| **PostgreSQL** | Primary relational database |
| **Sequelize** | PostgreSQL ORM |
| **MongoDB** | NoSQL database for CRM data |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Nodemailer** | Email notifications |
| **Multer** | File uploads (bulk Excel) |
| **xlsx** | Excel file parsing |
| **Nodemon** | Dev auto-restart |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ installed
- **PostgreSQL** database running
- **MongoDB** database running
- **Gmail Account** with App Password for SMTP

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shadesdesign24-arch/ridge-educational-services-backend.git

# 2. Navigate to the project
cd ridge-educational-services-backend

# 3. Install dependencies
npm install

# 4. Create environment file
cp .env.example .env
# Edit .env with your credentials (see below)

# 5. Start development server
npm run dev
```

### Available Scripts

| Script | Command | Description |
|:---|:---|:---|
| 🔧 Dev | `npm run dev` | Start with hot-reload (nodemon) |
| 🏗️ Build | `npm run build` | Compile TypeScript to JavaScript |
| 🚀 Start | `npm start` | Run production build |

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000

# PostgreSQL Database
PG_URI=postgresql://username:password@localhost:5432/ridge_db

# MongoDB Database
MONGO_URI=mongodb://localhost:27017/ridge_edu

# JWT Secret Key
JWT_SECRET=your_super_secret_key_here

# Email (Gmail SMTP)
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
```

> ⚠️ **Important:** Use a [Google App Password](https://myaccount.google.com/apppasswords), NOT your regular Gmail password!

---

## 📡 API Endpoints

### 🔓 Public Routes (`/api`)

| Method | Endpoint | Description |
|:---:|:---|:---|
| `POST` | `/api/consultation` | Submit a consultation request |

### 🔑 Auth Routes (`/api/auth`)

| Method | Endpoint | Description |
|:---:|:---|:---|
| `POST` | `/api/auth/login` | Login (Admin/Employee) |

### 🛡️ Admin Routes (`/api/admin`) — *Requires Auth*

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/api/admin/colleges` | Get all colleges with cutoffs |
| `POST` | `/api/admin/college` | Add a new college (with fees & cutoffs) |
| `PUT` | `/api/admin/college/:id` | Edit college details & fees |
| `DELETE` | `/api/admin/college/:id` | Delete a college |
| `POST` | `/api/admin/cutoff` | Add cutoff to existing college |
| `DELETE` | `/api/admin/cutoff/:id` | Delete a cutoff mark |
| `GET` | `/api/admin/employees` | Get all employees |
| `POST` | `/api/admin/employee` | Create a new employee |
| `POST` | `/api/admin/bulk-upload/preview` | Preview Excel data |
| `POST` | `/api/admin/bulk-upload/confirm` | Confirm bulk import |
| `GET` | `/api/admin/consultations` | Get all consultation leads |
| `PUT` | `/api/admin/consultations/assign` | Bulk assign leads to employees |

### 👨‍💼 Employee Routes (`/api/employee`) — *Requires Auth*

| Method | Endpoint | Description |
|:---:|:---|:---|
| `POST` | `/api/employee/check-eligibility` | Check student eligibility |
| `POST` | `/api/employee/book` | Book a college admission |
| `POST` | `/api/employee/follow-up` | Save student to CRM |
| `GET` | `/api/employee/consultations` | Get assigned consultation leads |
| `PUT` | `/api/employee/consultations/:id/status` | Update lead status |

---

## 🗄️ Database Models

### PostgreSQL Models

#### 🏫 College
| Field | Type | Description |
|:---|:---|:---|
| `id` | INTEGER (PK) | Auto-increment ID |
| `name` | STRING | College name |
| `location` | STRING | City/State |
| `description` | TEXT | About the college |
| `website` | STRING | Official website URL |
| `yearWiseFees` | JSON | Array of `{year, amount}` objects |
| `admissionFee` | STRING | Admission fee amount |
| `healthCardFee` | STRING | Health card fee amount |
| `applicationFee` | STRING | Application fee amount |

#### 📊 CutoffMarks
| Field | Type | Description |
|:---|:---|:---|
| `id` | INTEGER (PK) | Auto-increment ID |
| `collegeId` | INTEGER (FK) | References College |
| `courseName` | STRING | e.g., "B.E Computer Science" |
| `category` | STRING | General / OBC / SC/ST / EWS |
| `minimumCutoff` | FLOAT | Minimum cutoff marks |

#### 📋 Consultation
| Field | Type | Description |
|:---|:---|:---|
| `id` | INTEGER (PK) | Auto-increment ID |
| `name` | STRING | Student name |
| `phone` | STRING | Contact number |
| `email` | STRING | Email address |
| `interest` | STRING | Academic interest |
| `type` | STRING | "Free" or "Paid" |
| `status` | STRING | Assigned / Completed / Dead Lead |
| `assignedTo` | INTEGER (FK) | Employee assigned |

#### 👤 User
| Field | Type | Description |
|:---|:---|:---|
| `id` | INTEGER (PK) | Auto-increment ID |
| `email` | STRING | Login email |
| `password` | STRING | Hashed password |
| `role` | STRING | "admin" or "employee" |

#### 📖 Booking
| Field | Type | Description |
|:---|:---|:---|
| `id` | INTEGER (PK) | Auto-increment ID |
| `employeeId` | INTEGER (FK) | Employee who booked |
| `collegeId` | INTEGER (FK) | College booked |
| `studentName` | STRING | Student name |

### MongoDB Models

#### 📞 FollowUp
| Field | Type | Description |
|:---|:---|:---|
| `studentName` | String | Student name |
| `studentPhone` | String | Phone number |
| `notes` | String | Follow-up notes |
| `status` | String | HOT / WARM / COLD |
| `employeeId` | Number | Employee reference |

---

## 📧 Email Integration

The system uses **Gmail SMTP** via Nodemailer to send automated emails when a new consultation request is submitted.

### Setup Gmail App Password:
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate a new app password for "Mail"
5. Copy the 16-character password to your `.env` file

---

## 🔑 Authentication

- Uses **JWT (JSON Web Tokens)** for stateless authentication
- Tokens are generated on login and must be sent in the `Authorization` header
- Format: `Authorization: Bearer <token>`
- Tokens are stored in **Session Storage** on the frontend

---

## 👥 Roles & Permissions

| Feature | Admin | Employee | Guest |
|:---|:---:|:---:|:---:|
| Manage Colleges | ✅ | ❌ | ❌ |
| Manage Employees | ✅ | ❌ | ❌ |
| Bulk Upload | ✅ | ❌ | ❌ |
| Assign Leads | ✅ | ❌ | ❌ |
| Check Eligibility | ❌ | ✅ | ❌ |
| Book Admissions | ❌ | ✅ | ❌ |
| Manage Follow-ups | ❌ | ✅ | ❌ |
| Update Lead Status | ❌ | ✅ | ❌ |
| Submit Consultation | ❌ | ❌ | ✅ |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<p align="center">
  Made with ❤️ by <b>Ridge Educational Services</b>
</p>
