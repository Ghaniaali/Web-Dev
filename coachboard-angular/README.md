# 🏋️ Coachboard

> A modern, AI-powered fitness coaching dashboard built with Angular.

**Coachboard** is a modern fitness management dashboard designed to help coaches manage clients, monitor fitness information, and generate AI-assisted meal plans from a centralized interface.

The project was built with **Angular** and focuses on a clean, responsive dashboard experience with reusable components, client management, and AI-powered functionality.

---

## ✨ Features

### 📊 Dashboard

* Modern fitness dashboard interface
* Overview of coaching-related information
* Clean sidebar navigation
* Responsive dashboard layout
* Reusable UI components
* Structured sections for future feature expansion

### 👥 Client Management

* View and manage clients
* Client-focused dashboard experience
* Client information displayed through reusable UI components
* Modal-based client management
* Designed to support future client tracking and analytics

### 🤖 AI Meal Planner

Coachboard includes an AI-assisted meal-planning feature that can generate meal recommendations based on client information.

The AI functionality is designed to:

* Generate personalized meal suggestions
* Use client information as contextual input
* Produce structured meal-planning responses
* Integrate with an external AI model/API
* Provide coaches with AI-assisted nutrition planning

### 🎨 Modern UI

* Professional dashboard layout
* Sidebar-based navigation
* Modal interfaces
* Responsive design
* Component-based architecture
* Focus on usability and visual hierarchy

### ⚡ Angular SSR + Zoneless

The application uses modern Angular architecture, including:

* Angular 20
* Server-Side Rendering (SSR)
* Zoneless change detection
* Standalone Angular architecture
* Component-based development

---

# 🛠️ Tech Stack

| Technology           | Purpose                              |
| -------------------- | ------------------------------------ |
| **Angular 20.3.x**   | Frontend framework                   |
| **TypeScript**       | Application development              |
| **HTML5**            | Application structure                |
| **CSS**              | Styling and responsive layouts       |
| **Angular SSR**      | Server-side rendering                |
| **Zoneless Angular** | Modern change-detection architecture |
| **AI API**           | AI-assisted meal planning            |
| **Git**              | Version control                      |
| **GitHub**           | Source-code hosting                  |
| **Vercel**           | Deployment                           |

---

# 🏗️ Project Architecture

Coachboard follows a component-based Angular architecture.

The application is structured around independent UI components and feature-oriented functionality.

A simplified architecture looks like this:

```text
Coachboard
│
├── Dashboard
│   ├── Overview
│   ├── Statistics
│   └── Dashboard Components
│
├── Clients
│   ├── Client List
│   ├── Client Details
│   └── Client Modal
│
├── AI Meal Planner
│   ├── Client Information
│   ├── AI Request
│   └── Generated Meal Plan
│
├── Shared UI
│   ├── Sidebar
│   ├── Modals
│   └── Reusable Components
│
└── Angular Application
    ├── Components
    ├── Services
    ├── Routes
    └── SSR
```

---

# 📋 Prerequisites

Before running Coachboard locally, make sure you have the following installed:

* **Node.js**
* **npm**
* **Angular CLI**
* **Git**

You can verify your installations with:

```bash
node --version
npm --version
ng version
git --version
```

---

# 🚀 Getting Started

## 1. Clone the Repository

Clone the GitHub repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate into the project directory:

```bash
cd coachboard
```

---

## 2. Install Dependencies

Install the required npm packages:

```bash
npm install
```

---

## 3. Configure Environment Variables

If the application uses an AI API or other external services, configure the required environment variables before running the application.

Create the appropriate environment configuration according to your project setup.

For example:

```text
API_KEY=your_api_key_here
```

### 🔐 Security

**Never commit API keys or other secrets to GitHub.**

Do not place private API credentials directly inside frontend TypeScript files.

Instead:

1. Store secrets in environment variables.
2. Add environment files containing secrets to `.gitignore`.
3. Use a secure server-side/API layer for sensitive requests.
4. Add the corresponding variables to Vercel's project settings for production.

Example `.gitignore` entries:

```gitignore
.env
.env.*
!.env.example
```

---

# 💻 Development Server

Start the Angular development server:

```bash
ng serve
```

Then open:

```text
http://localhost:4200/
```

The application will automatically reload when source files are modified.

---

# 🏗️ Build

Create a production build:

```bash
ng build
```

The compiled application will be generated in the Angular distribution directory.

For a production-oriented build:

```bash
ng build --configuration production
```

---

# 🌐 Deployment

Coachboard is deployed using **Vercel**.

The project is connected to GitHub, allowing the deployment workflow to work with the repository.

### Deployment workflow

```text
Local Development
       │
       ▼
   Git Commit
       │
       ▼
   GitHub Push
       │
       ▼
     Vercel
       │
       ▼
 Production Deployment
```

Typical deployment commands:

```bash
git add .
git commit -m "Update Coachboard"
git push
```

When the repository is connected to Vercel, new commits can trigger a new deployment automatically.

# 🧩 Main Components

## Dashboard

The main dashboard provides the central interface for navigating Coachboard and accessing coaching functionality.

Responsibilities include:

* Dashboard overview
* Navigation
* Client access
* AI feature access
* Future analytics and coaching functionality

---

## Client Modal

The client modal provides a reusable interface for adding or editing client information.

A modal-based approach keeps client-management interactions within the dashboard instead of requiring unnecessary page navigation.

---

## AI Meal Planner

The AI Meal Planner provides coaches with an interface for generating meal-planning recommendations.

The feature can be expanded in the future to support:

* Calories
* Macronutrients
* Dietary preferences
* Allergies
* Fitness goals
* Meal frequency
* Food preferences
* Pakistani/local food options
* Weekly meal plans
* Grocery lists

---

# 🎯 Project Goals

Coachboard was designed around several core goals:

### 1. Simplify coaching workflows

Provide coaches with a centralized dashboard rather than requiring multiple disconnected tools.

### 2. Improve client management

Create a structured foundation for managing fitness clients.

### 3. Introduce AI-assisted coaching

Use AI to reduce repetitive tasks such as creating initial meal-plan recommendations.

### 4. Build a scalable Angular application

Use modern Angular architecture that can be expanded as additional features are introduced.

### 5. Provide a professional user experience

Focus on clean UI, reusable components, responsive layouts, and intuitive navigation.

---

# 🔮 Future Improvements

Coachboard can be expanded significantly in future versions.

Potential improvements include:

* [ ] Authentication and authorization
* [ ] Coach accounts
* [ ] Client accounts
* [ ] Persistent database
* [ ] Client progress tracking
* [ ] Workout-plan generator
* [ ] AI workout recommendations
* [ ] Advanced AI meal planner
* [ ] Calorie and macro tracking
* [ ] Progress charts
* [ ] Weight tracking
* [ ] Body measurements
* [ ] Workout history
* [ ] Client notifications
* [ ] Appointment scheduling
* [ ] Subscription management
* [ ] Payment integration
* [ ] Advanced analytics
* [ ] Mobile-friendly improvements
* [ ] Dark/light theme support
* [ ] More AI model integrations

---

# 📚 What I Learned

Building Coachboard provided practical experience with:

* Modern Angular development
* Angular component architecture
* TypeScript
* Responsive dashboard design
* Reusable UI components
* Modal-based interactions
* Angular SSR
* Zoneless Angular
* API integration
* AI integration
* Environment variables
* Git and GitHub workflows
* Vercel deployment
* Frontend security considerations

---

# 🚧 Project Status

**Status: Active Development 🚀**

Coachboard currently serves as a foundation for a modern fitness-coaching platform. The dashboard and core UI functionality are implemented, while additional backend, authentication, persistence, and advanced coaching features can be added over time.

---

# 👩‍💻 Author

**Ghania Ali**

Computer Science Student
Interested in Software Engineering, Frontend Development, AI, and modern web technologies.

---

# 📄 License

This project is currently intended for educational and portfolio purposes.

If you plan to distribute or commercially use the project, add an appropriate open-source or proprietary license here.

For example:

```text
MIT License
```

or replace this section with the license that applies to the project.

---

# ⭐ Acknowledgements

Built using modern web development technologies and AI-assisted development workflows.

Special thanks to the open-source ecosystem surrounding:

* Angular
* TypeScript
* Node.js
* npm

---


