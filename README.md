# Bite Check

Bite Check is a student-focused food review website designed for Brisbane, with honest recommendations, affordable picks, and a clear verdict on whether a place is really worth the hype.

The project combines a React frontend with a PHP and MySQL backend, allowing users to browse restaurant reviews, filter content, subscribe to the newsletter, send contact messages, and manage reviews through an admin panel.

This project was developed as part web development assessment and reflects a practical full-stack application built for a real-world food blog experience.

## Project Overview

Bite Check was created to help students and locals discover food spots in Brisbane based on two honest perspectives, price value, and overall experience. The website presents restaurant reviews in an easy-to-read format, with categories such as trending spots and student picks.

## Team

- Henrique Alves
- Rodrigo Souza

The project was developed during the Web Development unit at Victoria University, Brisbane Campus, Australia.

## Features

- Homepage with branding and clear calls to action
- Review listing page for restaurants and food spots
- Filtering by category, price, rating, and location
- Review detail pages with individual commentary
- Trending spots and student picks sections
- Contact form for user submissions
- Newsletter signup form
- Admin login and review management tools
- Image upload support for review content

## Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Sass
- ESLint

### Backend

- PHP
- MySQL
- PDO / MySQLi

## Admin Login

The default admin credentials are:

- Email: admin@bitecheck.com
- Password: bitecheck123

These values are defined in Back-end/db.config.php.

## Hosting

This project is currently hosted using InfinityFree, taking advantage of its free PHP hosting options. The deployment is set up to support a PHP-based backend and database-driven content, which aligns well with the current architecture of the project.

## Image Credits

All food and lifestyle images used in the project were sourced from Unsplash.

We would like to thank Unsplash for providing high-quality free images that helped bring the website to life. Their platform has been a valuable resource for the visual design of the project.

Some of the visual elements and presentation assets were also refined or enhanced using AI-assisted tools to better match the final design direction and improve consistency across the site.

## Important Notes

- The Back-end/uploads/reviews folder stores uploaded review images.
- The PHP files act as API endpoints for retrieving, creating, updating, and deleting reviews.
- CORS headers are included to allow frontend communication during local development.
- The project is intended primarily for local development and lightweight deployment use.

## License

This project was created for academic and educational purposes. Please check repository usage restrictions before using it for commercial or external distribution.
