---
sidebar_position: 2
---

# Getting Started

Get up and running with the Speckit + Docusaurus documentation system for your AI-Native Physical AI & Humanoid Robotics textbook.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (version 20 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- Basic knowledge of Markdown and React

## Installation

1. **Clone the repository** (if starting fresh):
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Project Structure

The project follows this structure:

```
website/
├── docs/              # Documentation files
├── specs/             # Generated specifications
├── guides/            # Tutorial guides
├── api/               # API documentation
├── components/        # React components
├── src/
│   ├── components/    # Custom React components
│   ├── css/           # Custom styles
│   └── pages/         # Standalone pages
├── static/            # Static assets
├── docusaurus.config.js  # Configuration file
└── sidebars.js        # Sidebar configuration
```

## Creating Content

### Adding Documentation

To create a new documentation page:

1. Create a new `.md` file in the `docs/` directory
2. Add frontmatter with metadata:

```markdown
---
sidebar_position: 3
title: My New Page
description: Learn how to do something
---

# My New Page

Content goes here...
```

### Adding to Navigation

The sidebar automatically includes documentation files. To control the order, use `sidebar_position` in the frontmatter.

## Running the Generator

To run Speckit and generate specifications:

```bash
npm run generate:specs
```

This command runs the Speckit generator to create documentation from your codebase and places it in the `specs/` directory.