# How Speckit Works

Learn how Speckit integrates with Docusaurus to automatically generate specifications and documentation from your codebase.

## Overview

Speckit is an automated documentation generation system that extracts information from various sources in your codebase to create comprehensive specifications. It works by analyzing:

- Code comments (JSDoc, TS Doc)
- Configuration files
- API definitions
- Markdown files
- Code structure and patterns

## Integration Points

### 1. Code Comments

Speckit reads structured comments in your code:

```javascript
/**
 * Calculate the forward kinematics for a robotic arm
 * @param {Array<number>} jointAngles - Array of joint angles in radians
 * @param {Object} robotConfig - Robot configuration object
 * @returns {Object} Position and orientation of the end effector
 * @example
 * const result = calculateForwardKinematics([0, Math.PI/2, 0], robotConfig);
 * console.log(result.position); // { x: 0.5, y: 0, z: 0.3 }
 */
function calculateForwardKinematics(jointAngles, robotConfig) {
  // Implementation here
}
```

### 2. Configuration Files

Speckit analyzes configuration files to understand your project structure:

```json
{
  "name": "robotics-system",
  "version": "1.0.0",
  "dependencies": {
    "roslib": "^1.0.0",
    "tf2": "^1.0.0"
  },
  "scripts": {
    "start": "node server.js",
    "docs": "speckit generate"
  }
}
```

### 3. API Definitions

For API documentation, Speckit reads from:

- OpenAPI/Swagger files
- GraphQL schemas
- REST endpoint definitions
- FastAPI route definitions

## Running the Generator

### Manual Generation

Run the Speckit generator manually:

```bash
npm run generate:specs
```

This command:
1. Scans your codebase for documentation
2. Extracts relevant information
3. Generates specification files
4. Places them in the `specs/` directory

### Automated Generation

Set up automated generation in your CI/CD pipeline:

```yaml
name: Generate Documentation
on:
  push:
    branches: [main]

jobs:
  generate-docs:
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
      - name: Deploy documentation
        run: npm run deploy
```

## Configuration

### Speckit Configuration File

Create `speckit.config.js` to customize the generation process:

```javascript
module.exports = {
  // Source code configuration
  source: {
    include: [
      'src/',           // Main source directory
      'backend/',       // Backend API files
      'components/'     // React components
    ],
    exclude: [
      'node_modules/',  // Exclude dependencies
      'dist/',          // Exclude build output
      'build/'          // Exclude build output
    ],
    includePattern: '.+\\.js(doc|x)?$',
    excludePattern: '(^|\\/|\\\\)_'
  },

  // Output configuration
  opts: {
    destination: './specs/',  // Where to place generated specs
    recurse: true,            // Recursively scan directories
    verbose: true,            // Show detailed output
    template: 'templates/default', // Template to use
  },

  // Plugins to enhance functionality
  plugins: [
    'plugins/markdown',      // Parse markdown in comments
    'plugins/summarize',     // Generate summaries
    'plugins/advanced-types', // Handle complex types
  ],

  // Template configuration
  templates: {
    cleverLinks: true,
    monospaceLinks: false,
    default: {
      outputSourceFiles: true,
      includeDate: false,
    }
  }
};
```

## Generated Output

Speckit creates comprehensive specification files in the `specs/` directory:

```
specs/
├── components/           # Component specifications
│   ├── Button.md
│   └── RobotController.md
├── api/                 # API specifications
│   ├── robot-control.md
│   └── navigation.md
├── modules/             # Module specifications
│   ├── kinematics.md
│   └── perception.md
└── summary.json         # Summary of all generated specs
```

## Integration with Docusaurus

The generated specs are automatically integrated into Docusaurus through the plugin system. The `specs` plugin in `docusaurus.config.js` makes these available at the `/specs/` route.

## Best Practices

### 1. Consistent Commenting

Use consistent patterns in your code comments:

```javascript
/**
 * Function name: Brief description
 * @param {Type} paramName - Parameter description
 * @returns {Type} Return value description
 * @throws {ErrorType} When specific condition occurs
 */
```

### 2. Meaningful Examples

Include practical examples in your documentation:

```javascript
/**
 * Move the robot to a target position
 * @param {Object} target - Target position {x, y, z}
 * @param {number} speed - Movement speed (0-1)
 * @example
 * // Move to position at half speed
 * moveTo({x: 1, y: 2, z: 0.5}, 0.5);
 */
```

### 3. Type Definitions

Provide clear type definitions:

```javascript
/**
 * @typedef {Object} RobotState
 * @property {number} x - X coordinate
 * @property {number} y - Y coordinate
 * @property {number} z - Z coordinate
 * @property {number} theta - Rotation angle
 */
```

## Troubleshooting

### Missing Documentation

If documentation isn't being generated:

1. Check that your code files are included in the `source.include` configuration
2. Verify that your comments follow the JSDoc format
3. Ensure Speckit has proper file permissions

### Build Errors

If you encounter build errors:

1. Check that all dependencies are installed
2. Verify that your configuration files are valid JSON/JavaScript
3. Look for syntax errors in your documentation comments