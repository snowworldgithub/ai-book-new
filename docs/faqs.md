# Frequently Asked Questions

Find answers to common questions about the Speckit + Docusaurus documentation system for the AI-Native Physical AI & Humanoid Robotics textbook.

## General Questions

### What is Speckit + Docusaurus?

Speckit + Docusaurus is an integrated documentation system that combines automated documentation generation (Speckit) with a powerful static site generator (Docusaurus). It's designed specifically for the AI-Native Physical AI & Humanoid Robotics textbook project to provide comprehensive, up-to-date documentation.

### How does the auto-generation work?

The system uses JSDoc and other documentation tools to extract information from code comments, type definitions, and API routes. This information is then formatted into comprehensive specifications that are integrated directly into the Docusaurus documentation site.

### What programming languages are supported?

The system primarily supports JavaScript, TypeScript, Python, and any other languages that have JSDoc-compatible documentation tools. It can extract documentation from:
- JavaScript/TypeScript files with JSDoc comments
- Python files with docstrings
- API route definitions (FastAPI, Express, etc.)
- Configuration files
- Markdown documentation files

## Setup and Installation

### How do I install the documentation system?

1. Ensure you have Node.js 20+ installed
2. Clone the repository
3. Run `npm install` to install dependencies
4. Run `npm start` to start the development server
5. Run `npm run generate:specs` to generate specifications from your code

### What if I get errors during installation?

Common installation issues and solutions:

**Issue**: `npm install` fails with permission errors
**Solution**: Run with `sudo` on macOS/Linux or run Command Prompt as administrator on Windows

**Issue**: `npm start` fails with port already in use
**Solution**: Use a different port: `npm start -- --port 3001`

**Issue**: Generation fails with "command not found"
**Solution**: Ensure all dependencies are installed and try running `npx jsdoc` directly

### How do I configure the system for my project?

Create or modify the `speckit.config.js` file in your project root. This file controls:
- Source directories to scan
- Output directory for generated specs
- File patterns to include/exclude
- Template and formatting options

## Documentation Generation

### How often should I run the generator?

For development, run the generator whenever you make significant changes to your code documentation. In production, set up a CI/CD pipeline to run the generator automatically on each deployment.

### What happens if my code has no documentation comments?

The generator will still run but will produce minimal output for undocumented code. To get the most value from the system, add JSDoc-style comments to your functions, classes, and modules.

### How do I add documentation to my code?

Use JSDoc-style comments above functions, classes, and modules:

```javascript
/**
 * Calculate the forward kinematics for a robotic arm
 * @param {Array<number>} jointAngles - Array of joint angles in radians
 * @param {Object} robotConfig - Robot configuration object
 * @returns {Object} Position and orientation of the end effector
 * @example
 * const result = calculateForwardKinematics([0, Math.PI/2, 0], robotConfig);
 */
function calculateForwardKinematics(jointAngles, robotConfig) {
  // Implementation here
}
```

## AI Features

### How does the RAG chatbot work?

The Retrieval-Augmented Generation (RAG) chatbot works by:
1. Converting textbook content into vector embeddings
2. Storing these embeddings in a vector database (Qdrant)
3. When a user asks a question, finding the most relevant content
4. Using this content to generate accurate, context-aware responses

### Can I customize the AI features?

Yes, the AI features are highly customizable. You can:
- Adjust the RAG system's confidence thresholds
- Modify the personalization algorithms
- Add custom subagents for specific domains
- Configure the translation system for different languages

### How do I integrate my own AI models?

The system is designed to work with OpenAI's API by default, but you can integrate other models by:
1. Modifying the API service implementations in the backend
2. Updating the configuration to point to your model endpoints
3. Ensuring your models meet the expected input/output formats

## Content Management

### How do I organize my documentation?

The system follows the Diátaxis framework with four types of content:
- **Tutorials**: Learning-oriented, step-by-step lessons
- **How-to guides**: Task-oriented, problem-solving instructions
- **Explanation**: Understanding-oriented, conceptual overviews
- **Reference**: Information-oriented, technical specifications

### Where should I put different types of content?

- **User documentation**: In the `docs/` directory
- **Generated specifications**: In the `specs/` directory (automatically generated)
- **Tutorials and guides**: In the `guides/` directory
- **API documentation**: In the `api/` directory

### How do I link between documentation pages?

Use relative links for internal navigation:

```markdown
[See the installation guide](./installation.md)
[API Reference](../api/reference.md)
```

## Integration

### How do I integrate with existing codebases?

To integrate with an existing codebase:

1. Add the documentation dependencies to your project
2. Configure the source directories in `speckit.config.js`
3. Add JSDoc comments to your existing code
4. Set up the generation script in your build process
5. Run the generator to create initial specifications

### Can I use this with other documentation tools?

Yes, the system can work alongside other documentation tools. It's designed to complement existing systems rather than replace them entirely.

### How do I handle versioned documentation?

Docusaurus has built-in support for versioned documentation. You can:
- Use the `@docusaurus/plugin-content-docs` with versioning enabled
- Maintain different versions of your specs directory
- Set up automatic versioning in your CI/CD pipeline

## Troubleshooting

### The development server won't start

Try these solutions:
1. Clear the cache: `npm run clear`
2. Check if the port is in use by another process
3. Verify all dependencies are installed: `npm install`
4. Check for syntax errors in your configuration files

### Generated specs are not showing up

1. Verify that your source files have proper JSDoc comments
2. Check that your `speckit.config.js` includes the correct source directories
3. Ensure the output directory has write permissions
4. Run the generator with verbose output: `npm run generate:specs -- --verbose`

### The AI features aren't working

1. Verify that your API keys are properly configured in environment variables
2. Check that the backend services are running
3. Confirm that the vector database is properly set up
4. Review the logs for error messages

### Search isn't working properly

1. If using Algolia, verify your API keys and index configuration
2. Check that your content has proper headings and structure
3. Ensure the search plugin is properly configured in `docusaurus.config.js`

## Performance

### How can I improve build performance?

- Limit the number of files scanned by being specific with include/exclude patterns
- Use incremental builds when possible
- Optimize images and other static assets
- Implement proper caching strategies

### The site is loading slowly

- Optimize images and reduce their file sizes
- Implement code splitting for large documentation sets
- Use a CDN for static assets
- Minimize the number of external dependencies

## Customization

### How do I customize the look and feel?

You can customize the appearance by:
- Modifying the CSS in `src/css/custom.css`
- Adding custom React components in `src/components/`
- Overriding Docusaurus theme components
- Configuring the theme settings in `docusaurus.config.js`

### Can I add interactive elements?

Yes, you can add interactive elements using:
- React components within your Markdown files
- The React Live playground for code examples
- Custom MDX components
- Interactive diagrams and visualizations

## Deployment

### How do I deploy the documentation site?

The site can be deployed to various platforms:

**GitHub Pages**: Use the `docusaurus deploy` command with proper GitHub configuration

**Netlify/Vercel**: Connect your repository and set build command to `npm run build`

**Self-hosted**: Serve the contents of the `build/` directory with any web server

### How do I set up continuous deployment?

Configure your CI/CD pipeline to:
1. Install dependencies
2. Generate specifications
3. Build the site
4. Deploy to your hosting platform

Example GitHub Actions workflow:

```yaml
name: Deploy Documentation
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm install
      - name: Generate specs
        run: npm run generate:specs
      - name: Build documentation
        run: npm run build
      - name: Deploy
        # Add deployment steps for your platform
```