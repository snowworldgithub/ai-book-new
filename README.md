# Speckit + Docusaurus Documentation System

Documentation system for the AI-Native Physical AI & Humanoid Robotics textbook project, combining automated documentation generation (Speckit) with a powerful static site generator (Docusaurus).

## Overview

This project implements a comprehensive documentation system that automatically generates specifications and documentation from source code, integrated with a modern documentation platform. It's designed specifically for the AI-Native Physical AI & Humanoid Robotics textbook project to provide:

**Latest Update**: Enhanced documentation structure with improved navigation and better code examples (Dec 2025)

- **Automated Documentation Generation**: Extracts documentation from code comments and definitions
- **Multi-Format Documentation**: Tutorials, guides, API references, and specifications
- **AI Integration**: Ready for integration with RAG chatbot and personalization systems
- **Component Playground**: Interactive examples using React Live
- **Internationalization**: Support for multiple languages including Urdu

## Features

### Documentation Generation
- Auto-generates specs from JSDoc comments
- Supports JavaScript, TypeScript, Python, and JSON
- Customizable templates and output formats
- Integration with Docusaurus documentation system

### Documentation Types
- **Tutorials**: Step-by-step learning guides
- **How-to Guides**: Task-oriented instructions
- **Reference**: API and component specifications
- **Explanation**: Conceptual overviews

### AI Features
- RAG Chatbot API documentation
- Content personalization system
- Urdu translation system
- AI subagent framework

## Prerequisites

- **Node.js**: Version 20.0 or higher
- **npm**: Version 8 or higher
- **Git**: Version 2.13 or higher

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

This will start a local development server at `http://localhost:3000`.

## Project Structure

```
website/
├── docs/                    # Main documentation
├── specs/                   # Auto-generated specifications
├── guides/                  # Tutorial guides
├── api/                     # API documentation
├── components/              # React components
├── backend/                 # Backend services
├── scripts/                 # Build and generation scripts
├── src/
│   ├── components/          # Custom React components
│   ├── css/                 # Custom styles
│   └── pages/               # Standalone pages
├── static/                  # Static assets
├── speckit.config.js        # Speckit configuration
├── docusaurus.config.js     # Docusaurus configuration
├── sidebars.js              # Sidebar configurations
└── package.json             # Project dependencies and scripts
```

## Key Scripts

- `npm start`: Start development server
- `npm run build`: Create production build
- `npm run serve`: Serve production build locally
- `npm run generate:specs`: Generate documentation from code
- `npm run clear`: Clear Docusaurus cache

## Documentation Generation

The system automatically generates specifications from your codebase:

1. **Add JSDoc comments** to your functions, classes, and components
2. **Run the generator**: `npm run generate:specs`
3. **View generated specs** in the `specs/` directory
4. **Access via Docusaurus** at the `/specs/` route

### Example JSDoc Comment
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

## Configuration

### Speckit Configuration (`speckit.config.js`)
Controls which directories to scan and where to output generated specs:

```javascript
module.exports = {
  source: {
    include: ['src/', 'backend/', 'components/'],
    exclude: ['node_modules/', 'dist/', 'build/'],
  },
  opts: {
    destination: './specs/',
    recurse: true,
  },
  // ... more options
};
```

### Docusaurus Configuration (`docusaurus.config.js`)
Configures the documentation site, plugins, and themes:

```javascript
module.exports = {
  title: 'Speckit + Docusaurus Documentation',
  tagline: 'Documentation System for AI-Native Physical AI & Humanoid Robotics Textbook',
  // ... more configuration
};
```

## Development Workflow

1. **Add documentation** to your source code using JSDoc comments
2. **Generate specs** with `npm run generate:specs`
3. **Write guides** in the `guides/` directory
4. **Update API docs** in the `api/` directory
5. **Test locally** with `npm start`
6. **Build for production** with `npm run build`

## AI Integration

The system is designed to work with AI features:

- **RAG Chatbot**: Question-answering using textbook content
- **Personalization**: Content adaptation based on user profiles
- **Translation**: Urdu translation system
- **Subagents**: Specialized AI assistants for robotics topics

## Customization

### Styling
Custom styles are in `src/css/custom.css` using the Infima CSS framework.

### Components
Custom React components can be added in `src/components/` and used in Markdown files.

### Plugins
Additional Docusaurus plugins can be added in `docusaurus.config.js`.

## Deployment

### GitHub Pages
1. Update `docusaurus.config.js` with your GitHub repository details
2. Run `npm run deploy`

### Other Platforms
- **Netlify**: Connect your repository and set build command to `npm run build`
- **Vercel**: Connect your repository and deploy automatically
- **Self-hosted**: Serve the contents of the `build/` directory

## Troubleshooting

### Common Issues

**Issue**: Generated specs are empty
**Solution**: Check that your source files have proper JSDoc comments

**Issue**: Site doesn't reflect changes
**Solution**: Clear cache with `npm run clear` and restart

**Issue**: Generation fails with syntax errors
**Solution**: Verify source files have valid syntax

### Getting Help

- Check the [FAQs](./docs/faqs.md) for common questions
- Review the [Best Practices](./docs/best-practices.md) for guidance
- Look at the [Examples](./guides/examples.md) for practical implementations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes and add documentation
4. Run `npm run generate:specs` if adding code documentation
5. Test with `npm start`
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Next Steps

1. **Add your code documentation** with JSDoc comments
2. **Generate initial specs** with `npm run generate:specs`
3. **Customize the configuration** for your specific needs
4. **Add your own guides** in the `guides/` directory
5. **Deploy your documentation** site