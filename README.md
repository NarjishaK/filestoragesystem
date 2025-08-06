```markdown
# 📁 FileStorage  System

 file storage frontend application built with **Next.js**, **TypeScript/JavaScript**, **Tailwind CSS**, and integrated with a **Node.js + MongoDB** backend using **REST APIs** and **JWT authentication**.

---

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript / JavaScript
- **Styling**: Tailwind CSS, CSS Modules
- **API**: REST API
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Hooks & Context API
- **Backend**: Node.js (handled separately)
- **Database**: MongoDB

---

## 📁 Project Structure

```

src/
├── Helper/              # API handlers and utility hooks
│   ├── handleapi.js
│   └── useForm.js
│
├── components/          # Reusable UI components
│   ├── Auth/            # Signin / Signup Components
│   ├── Common/          # Breadcrumbs.
│   ├── Footer/
│   ├── Header/
│   ├── Home/
│   ├── MainPage/
│   └── MyAccount/
│
├── app/                
│   ├── (site)/          # Main app routes
│   ├── css/             # Global styles
│   └── favicon.ico

````

---

## 📦 Getting Started

### 1. **Clone the Repository**
```bash
git clone https://github.com/NarjishaK/filestoragesystem.git
cd filestoragesystem 
````

### 2. **Install Dependencies**

```bash
npm install
# or
yarn install
```

### 3. **Environment Variables**

Create a `.env` file in the root directory and add your API configuration:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

### 4. **Run the Development Server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛠 Features

- 🔐 **Authentication & Security**
  - User Sign Up with email verification
  - Login & Secure session handling
  - Forgot Password with OTP-based verification

- 📦 **File Management**
  - Upload **multiple file types** (images, PDFs, docs, videos, etc.)
  - Organize files in **folders**
  - **Preview** files (images, videos, PDFs)
  - **Download** and **Delete** files securely
  - Filter files by **type**

- 📃 **File Display**
  - List view of all uploaded files
  - Show file name, size, upload time
  - Show type-based icons and preview modals
  - My Account Management

---

## 🔐 Authentication Flow

* User signs in via `/signin`
* JWT is saved in localStorage
* Protected pages verify token before granting access
* Auto redirect to `/signin` if token is missing/invalid

---

## 📁 API Integration

All API calls are centralized inside:

```
src/Helper/handleapi.js
```

---

## ✨ Credits

Built with by \[Narjisha]
---
```
