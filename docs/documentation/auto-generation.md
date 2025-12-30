# Auto-Generation Process

Learn how Speckit automatically generates specifications and documentation from your codebase.

## Overview

The auto-generation process extracts documentation from your source code to create comprehensive specifications. This ensures your documentation stays synchronized with your codebase.

## Generation Pipeline

### 1. Source Analysis

Speckit analyzes multiple source types:

- **Code comments**: JSDoc, TS Doc, and other structured comments
- **Type definitions**: TypeScript interfaces, types, and classes
- **Function signatures**: Parameters, return types, and descriptions
- **Configuration files**: Package.json, API definitions, etc.
- **File structure**: Directory organization and naming patterns

### 2. Information Extraction

The system extracts:

- **Function signatures**: Parameters, return types, and descriptions
- **Class definitions**: Properties, methods, and inheritance
- **Component props**: React component properties and types
- **API endpoints**: Routes, request/response schemas, and examples
- **Module dependencies**: Import/require relationships

### 3. Documentation Generation

Generated documentation includes:

- **API references**: Complete endpoint documentation
- **Component specs**: Props, usage examples, and behavior
- **Module docs**: Exports, dependencies, and functionality
- **Type definitions**: Interfaces and type relationships

## Configuration

### Speckit Configuration

The generation process is controlled by `speckit.config.js`:

```javascript
module.exports = {
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
    includePattern: '.+\\.(js|jsx|ts|tsx|json)?$',
    excludePattern: '(^|\\/|\\\\)_'
  },
  opts: {
    destination: './specs/',  // Output directory
    recurse: true,            // Recursively scan directories
    verbose: true,            // Show detailed output
    template: 'templates/default', // Template to use
  },
  plugins: [
    'plugins/markdown',      // Parse markdown in comments
    'plugins/summarize',     // Generate summaries
    'plugins/advanced-types', // Handle complex types
  ],
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

### Custom Templates

Create custom templates for specialized output:

```javascript
// templates/component-spec.hbs
---
title: {{name}}
description: {{description}}
---

# {{name}}

{{#if description}}
{{description}}
{{/if}}

## Props

{{#each params}}
### {{name}}
- **Type**: {{type.names.0}}
- **Required**: {{#if optional}}No{{else}}Yes{{/if}}
- **Default**: {{#if defaultvalue}}{{defaultvalue}}{{else}}None{{/if}}

{{description}}

{{/each}}
```

## Generation Triggers

### Manual Generation

Run generation manually:

```bash
npm run generate:specs
```

### Automated Generation

Set up automated generation in different scenarios:

#### Git Hooks

Use git hooks to generate specs before commits:

```javascript
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

npm run generate:specs
git add specs/
```

#### CI/CD Pipeline

Generate specs during deployment:

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
        run: npm run deploy
```

#### Watch Mode

For development, watch for changes:

```json
{
  "scripts": {
    "generate:watch": "nodemon --watch 'src/**/*' --ext 'js,jsx,ts,tsx' --exec 'npm run generate:specs'"
  }
}
```

## Output Format

### Generated Files Structure

```
specs/
├── components/
│   ├── Button.md
│   ├── RobotController.md
│   └── ...
├── api/
│   ├── robot-control.md
│   ├── navigation.md
│   └── ...
├── modules/
│   ├── kinematics.md
│   ├── perception.md
│   └── ...
├── services/
│   ├── auth.md
│   └── ...
└── summary.json
```

### File Format

Generated specification files follow this structure:

```markdown
---
title: Component Name
description: Component description
sidebar_label: Component Name
---

# Component Name

Brief description of the component.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| propName | string | "default" | Property description |

## Usage

```jsx
<ComponentName prop="value" />
```

## Examples

Detailed usage examples...
```

## Integration with Docusaurus

### Plugin Integration

The `@docusaurus/plugin-content-docs` plugin automatically includes generated specs:

```javascript
// docusaurus.config.js
module.exports = {
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'specs',
        path: 'specs',
        routeBasePath: 'specs',
        sidebarPath: require.resolve('./sidebars-specs.js'),
      },
    ],
  ],
};
```

### Navigation Integration

Generated specs appear in the navigation sidebar under the "Specs" section.

## Quality Assurance

### Validation Process

The generation process includes validation:

1. **Syntax validation**: Ensures generated files have valid Markdown syntax
2. **Link validation**: Checks for broken internal links
3. **Content validation**: Verifies required fields are present
4. **Format validation**: Ensures consistent formatting

### Error Handling

The system handles errors gracefully:

```javascript
// In scripts/generate-specs.js
exec(`npx jsdoc -c ${jsdocConfig}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Generation failed: ${error.message}`);
    process.exit(1);
  }
  if (stderr) {
    console.warn(`Generation warnings: ${stderr}`);
  }
  console.log(`Generation completed successfully`);
});
```

## Performance Optimization

### Selective Generation

For large codebases, generate specs selectively:

```bash
# Generate only for specific directory
npx jsdoc -c jsdoc.config.js src/components/

# Generate only changed files
npx jsdoc -c jsdoc.config.js --diff
```

### Caching

Implement caching to speed up generation:

```javascript
const cache = new Map();

function generateIfChanged(sourceFile) {
  const hash = calculateHash(sourceFile);
  if (cache.get(sourceFile) !== hash) {
    generateSpec(sourceFile);
    cache.set(sourceFile, hash);
  }
}
```

## Troubleshooting

### Common Issues

**Issue**: Generated specs are empty
**Solution**: Check that source files have proper JSDoc comments

**Issue**: Generation takes too long
**Solution**: Narrow the include pattern or implement caching

**Issue**: Invalid Markdown output
**Solution**: Verify template syntax and configuration

### Debugging

Enable verbose output for debugging:

```bash
npm run generate:specs -- --verbose
```

Or set environment variable:

```bash
DEBUG=speckit:* npm run generate:specs
```

## Best Practices

### 1. Consistent Commenting

Use consistent patterns in code comments to ensure reliable generation.

### 2. Regular Generation

Run generation regularly to keep specs up-to-date with code changes.

### 3. Validation Checks

Include validation in your CI/CD pipeline to catch issues early.

### 4. Template Maintenance

Regularly review and update templates to maintain quality output.