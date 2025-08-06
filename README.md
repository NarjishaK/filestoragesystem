
---

```markdown
# 📁 FileStorage System

A secure, responsive file storage frontend application built with **Next.js**, **JavaScript/TypeScript**, and **Tailwind CSS**.  
It connects to a **Node.js + MongoDB** backend via **REST APIs** and uses **JWT** for authentication.

---

## 🚀 Tech Stack

- Framework: [Next.js](https://nextjs.org/)
- Language: TypeScript / JavaScript
- Styling: Tailwind CSS, CSS Modules
- API: REST API
- Authentication: JWT (JSON Web Tokens)
- State Management: React Hooks & Context API
- Backend: Node.js (handled separately)
- Database: MongoDB

---

### 1. Clone the Repository

```bash
git clone https://github.com/NarjishaK/filestoragesystem.git
cd filestoragesystem
````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Create Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🛠 Features

### 🔐 Authentication & Security

* Sign Up with Email Verification (via email link)
* Secure Login with JWT Token
* Forgot Password with OTP Email Verification

### 📁 File Management

* Upload **multiple files** (images, PDFs, docs, videos, etc.)
* Organize files using **folders**
* **Preview**, **Download**, and **Delete** files
* Filter files by **type**

### 📃 File Display

* See a list of all uploaded files
* View file metadata: name, type, size, upload time
* Preview modals
* My Account & Profile Management

---

## 🔐 Authentication Flow

```text
1. User signs in via /signin
2. JWT is stored in localStorage
3. Protected routes validate JWT on access
4. If JWT is missing/invalid → redirect to /signin
```

---

##  API Integration

All REST API interactions are centralized in:

```bash
src/Helper/handleapi.js
```

---
