# GitHub User Repositories Explorer

A React application that integrates with the GitHub API to search for users and display their repositories.

## Features

- Search for GitHub users by username.
- Display up to 5 matching users.
- View repositories for a selected user.
- Responsive design with hover effects on repository cards.
- Loading states for API requests.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework for styling.
- **Axios**: A promise-based HTTP client for making API requests.
- **TypeScript**: A typed superset of JavaScript for better developer experience.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
  git clone https://github.com/your-username/github-user-repositories-explorer.git

2. Navigate to the project directory:
  cd github-user-repositories-explorer

3. Install dependencies:
  npm install

## The application uses the following GitHub API endpoints:
- Search Users: https://api.github.com/search/users?q={query}&per_page=5
- Get User Repositories: https://api.github.com/users/{username}/repos

## Rate Limiting
Unauthenticated requests are limited to 60 requests per hour.
To increase the rate limit, add a GitHub personal access token to your requests:
<!-- axios.get(`https://api.github.com/search/users?q=${query}`, {
  headers: {
    Authorization: `Bearer YOUR_GITHUB_TOKEN`,
  },
}); -->