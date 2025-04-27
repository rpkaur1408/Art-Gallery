# 🎨 Art Gallery

A modern, full-stack art discovery platform built using **Next.js App Router**, **Jotai**, and **SWR**.  
The application allows authenticated users to **search for artworks**, **save favorites**, and **explore detailed metadata** from the Metropolitan Museum of Art through a seamless and responsive experience.

---

## 🛠️ Tech Stack

| Layer                 | Technologies Used                                                      |
|-----------------------|-------------------------------------------------------------------------|
| **Frontend**          | Next.js (App Router, Client Components), React, React-Bootstrap         |
| **Backend**           | Custom Express.js API Server (for authentication, favourites, history) |
| **Authentication**    | JWT (JSON Web Tokens), Route Guards                                     |
| **State Management**  | Jotai (Atoms)                                                          |
| **Data Fetching**     | SWR (Stale-While-Revalidate)                                            |
| **Forms**             | React Hook Form                                                        |
| **Styling**           | Bootstrap 5                                                            |
| **Language**          | JavaScript (ES6+)                                                      |

---

## 🚀 Key Features

- **User Authentication**: Secure registration and login with JWT tokens and protected routes.
- **Advanced Artwork Search**: Powerful search form supporting filters by keyword, medium, location, and artwork status.
- **Favorites Management**: Save and manage your favorite artworks directly to your personal account.
- **Search History Tracking**: Automatically records and displays your previous search queries.
- **Paginated Results**: Seamlessly browse large collections of artwork with dynamic pagination controls.
- **Detailed Artwork Pages**: View high-resolution images and rich metadata (artist, dimensions, era, and more).
- **Protected Routes**: Secure pages using custom route guards that verify JWT tokens on navigation.
- **Persistent User Data**: Favorites and search history stored securely through backend APIs.
- **Optimized Performance**: Data caching with SWR, preloading, and fast client navigation.

---

## 🖼️ Artwork Exploration and User Experience

- **Artwork Cards**: Browse grid-based cards with thumbnails, titles, and quick links to detailed views.
- **Artwork Detail View**: Access comprehensive information about any artwork, including provenance and artist background.
- **Favorites Page**: Curate your personal gallery of favorite pieces with real-time update support.
- **Search History Page**: Instantly revisit any past search with one click.
- **Empty States and Feedback**: Friendly UI prompts when no favorites or history entries are found.

---

## 🧠 Project Highlights

- **JWT-based Authentication**: Full control over login sessions using secure local storage and middleware validation.
- **Jotai State Management**: Lightweight, atomic state control for favorites and search history, improving app responsiveness.
- **SWR Data Fetching**: Fast and reliable artwork loading with automatic caching and background revalidation.
- **Dynamic Forms with Validation**: Robust and flexible search input handling using React Hook Form.
- **Express API Integration**: Scalable custom API endpoints for managing user data without third-party database lock-in.
- **Accessibility and Responsiveness**: Mobile-first design principles with Bootstrap 5 for a professional look across devices.
- **Environment Configuration**: Easily switch between development and production setups with environment variables.

---

