# Integrating with Existing Code

Learn how to integrate Speckit with your existing codebase for the Physical AI & Humanoid Robotics textbook project.

## Overview

Integrating Speckit with an existing codebase involves:

1. **Analyzing your current code structure**
2. **Adding documentation comments to existing code**
3. **Configuring Speckit for your specific project**
4. **Setting up the generation pipeline**

## Code Analysis

### Identifying Documentation Sources

Speckit can extract documentation from various parts of your existing code:

- **Function and method definitions**
- **Class and interface declarations**
- **Configuration files**
- **API route definitions**
- **Component definitions**
- **Type definitions**

### Current Project Structure

For the AI-Native Physical AI & Humanoid Robotics textbook, typical code locations include:

```
src/
├── components/          # React components
├── services/            # Backend services
├── utils/               # Utility functions
├── hooks/               # React hooks
└── types/               # Type definitions

backend/
├── api/                 # API routes
├── models/              # Data models
├── services/            # Backend services
└── middleware/          # Middleware functions
```

## Adding Documentation Comments

### JavaScript/TypeScript Functions

Add JSDoc comments to existing functions:

**Before:**
```javascript
function calculateForwardKinematics(jointAngles, robotConfig) {
  // Implementation here
}
```

**After:**
```javascript
/**
 * Calculate the forward kinematics for a robotic arm
 * @param {Array<number>} jointAngles - Array of joint angles in radians
 * @param {Object} robotConfig - Robot configuration object
 * @returns {Object} Position and orientation of the end effector
 * @throws {Error} If joint angles are invalid
 * @example
 * const result = calculateForwardKinematics([0, Math.PI/2, 0], robotConfig);
 * console.log(result.position); // { x: 0.5, y: 0, z: 0.3 }
 */
function calculateForwardKinematics(jointAngles, robotConfig) {
  // Implementation here
}
```

### React Components

Document React components with props and usage:

```javascript
/**
 * RobotController Component
 * Provides controls for robot movement and monitoring
 *
 * @component
 * @example
 * return (
 *   <RobotController
 *     robotId="robot-1"
 *     onPositionChange={handlePositionChange}
 *   />
 * )
 *
 * @param {string} robotId - Unique identifier for the robot
 * @param {Function} onPositionChange - Callback for position updates
 * @param {Object} [config] - Robot configuration
 * @returns {JSX.Element} Robot controller UI
 */
export function RobotController({ robotId, onPositionChange, config = {} }) {
  // Component implementation
}
```

### API Endpoints

Document API routes with request/response information:

```javascript
/**
 * @swagger
 * /api/robots/{id}/move:
 *   post:
 *     summary: Move robot to target position
 *     description: Command the robot to move to a specified position
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Robot ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               x:
 *                 type: number
 *                 description: Target X coordinate
 *               y:
 *                 type: number
 *                 description: Target Y coordinate
 *               speed:
 *                 type: number
 *                 description: Movement speed (0-1)
 *     responses:
 *       200:
 *         description: Movement command accepted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 taskId:
 *                   type: string
 *                   description: ID of the movement task
 */
app.post('/api/robots/:id/move', (req, res) => {
  // Implementation here
});
```

## Configuration for Existing Code

### Speckit Configuration

Create a configuration that works with your existing codebase:

```javascript
// speckit.config.js
module.exports = {
  source: {
    // Include all relevant source directories
    include: [
      'src/',                    // Frontend components and services
      'backend/',               // Backend services and APIs
      'docs/',                  // Existing documentation
      'components/'             // Additional components directory
    ],
    // Exclude generated files and dependencies
    exclude: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      '*.min.js',
      '*.bundle.js'
    ],
    // Include JavaScript, TypeScript, and Markdown files
    includePattern: '.+\\.(js|jsx|ts|tsx|md|markdown)?$',
    excludePattern: '(^|\\/|\\\\)_'
  },
  opts: {
    destination: './specs/',    // Output directory for generated specs
    recurse: true,              // Scan subdirectories recursively
    verbose: true,              // Show detailed output
    encoding: 'utf8',           // Source file encoding
    template: './node_modules/minami' // Template for generated docs
  },
  plugins: [
    'plugins/markdown',         // Parse markdown in comments
    'plugins/summarize',        // Generate summaries
    'plugins/advanced-types',   // Handle complex TypeScript types
    'plugins/underscore-docdash' // Enhanced template features
  ],
  templates: {
    cleverLinks: true,
    monospaceLinks: false,
    default: {
      outputSourceFiles: true,
      includeDate: false,
      systemName: 'Physical AI & Humanoid Robotics',
      footer: 'Generated by Speckit + Docusaurus',
      copyright: 'Copyright 2025',
      linenums: true,
      collapseSymbols: false,
      inverseNav: true
    }
  }
};
```

## Gradual Integration Strategy

### Phase 1: Setup and Configuration

1. **Install Speckit dependencies**:
   ```bash
   npm install --save-dev jsdoc minami
   ```

2. **Create configuration files**:
   - `speckit.config.js` or `jsdoc.config.js`
   - `scripts/generate-specs.js`

3. **Test with a small subset**:
   ```bash
   npx jsdoc -c jsdoc.config.js src/components/Button.js
   ```

### Phase 2: Documentation Addition

Focus on the most critical parts of your codebase:

1. **Public APIs and interfaces**
2. **Core business logic functions**
3. **Complex algorithms** (kinematics, path planning, etc.)
4. **Component interfaces**

### Phase 3: Full Integration

1. **Run generator on entire codebase**:
   ```bash
   npm run generate:specs
   ```

2. **Review generated documentation**:
   - Check for accuracy
   - Verify completeness
   - Identify missing documentation

3. **Iterate and improve**:
   - Add missing documentation
   - Refine existing comments
   - Update configuration as needed

## Handling Different Code Types

### ROS 2 Integration Code

For ROS 2 related code, include specific documentation:

```javascript
/**
 * ROS2 Node for robot control
 * Manages communication with ROS 2 middleware for robot control
 *
 * @class RobotControlNode
 * @param {string} nodeName - Name of the ROS node
 * @param {Object} options - Node configuration options
 *
 * @example
 * const robotNode = new RobotControlNode('robot_controller', {
 *   namespace: '/my_robot',
 *   enableStatistics: true
 * });
 * robotNode.start();
 */
class RobotControlNode {
  /**
   * Send movement command to robot
   * @param {Object} command - Movement command with x, y, theta
   * @param {number} command.x - Target x position
   * @param {number} command.y - Target y position
   * @param {number} command.theta - Target orientation
   * @returns {Promise<Object>} Command result with status
   */
  async sendMoveCommand(command) {
    // Implementation here
  }
}
```

### AI/ML Model Integration Code

For AI and machine learning components:

```javascript
/**
 * Vision-Language-Action (VLA) Pipeline
 * Processes visual input and language commands to generate robot actions
 *
 * @param {Object} visionInput - Image data from robot cameras
 * @param {string} languageCommand - Natural language command
 * @param {Object} robotState - Current robot state
 * @returns {Object} Action plan for the robot
 *
 * @example
 * const actionPlan = await vlaPipeline(
 *   robotCamera.getImage(),
 *   "Pick up the red block",
 *   robotState
 * );
 */
async function vlaPipeline(visionInput, languageCommand, robotState) {
  // Implementation here
}
```

## Verification and Testing

### Validating Generated Specs

After running the generator, verify the output:

1. **Check for completeness**: Ensure all major components are documented
2. **Verify accuracy**: Confirm that documentation matches the actual code
3. **Review formatting**: Check that generated specs are properly formatted
4. **Test integration**: Verify that specs work with Docusaurus

### Automated Checks

Add validation to your CI/CD pipeline:

```yaml
name: Validate Documentation
on: [push, pull_request]

jobs:
  validate-docs:
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
      - name: Validate generated specs
        run: |
          if [ ! -d "specs" ] || [ -z "$(ls -A specs)" ]; then
            echo "Error: No specs were generated"
            exit 1
          fi
          echo "Specs generated successfully"
```

## Best Practices for Existing Code

### 1. Start with Interfaces

Focus on documenting public interfaces first, as these are most critical for users of your code.

### 2. Use Consistent Patterns

Maintain consistent documentation patterns across your codebase to ensure uniform generated specs.

### 3. Prioritize Critical Code

Document the most important and complex parts of your codebase first.

### 4. Regular Updates

Set up regular generation runs to keep documentation up-to-date with code changes.

### 5. Review Process

Include documentation review as part of your code review process.