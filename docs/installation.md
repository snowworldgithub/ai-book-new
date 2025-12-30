# Installation (Speckit + Docusaurus)

Learn how to install and set up the Speckit + Docusaurus documentation system for your project.

## System Requirements

- **Operating System**: Windows, macOS, or Linux
- **Node.js**: Version 20.0 or higher
- **npm**: Version 8 or higher (usually comes with Node.js)
- **Git**: Version 2.13 or higher

## Quick Setup

### 1. Create a New Docusaurus Project

If starting fresh, create a new Docusaurus project:

```bash
npx create-docusaurus@latest my-website classic
cd my-website
```

### 2. Install Required Dependencies

Install the necessary packages for Speckit integration:

```bash
npm install --save-dev fs-extra glob jsdoc typescript
npm install react-live
```

### 3. Configure Docusaurus

Update your `docusaurus.config.js` to include the additional plugins for specs, API, and guides as shown in our configuration.

### 4. Set up Scripts

Add the following script to your `package.json`:

```json
{
  "scripts": {
    "generate:specs": "node scripts/generate-specs.js"
  }
}
```

## Speckit Integration

### 1. Create Speckit Configuration

Create a `speckit.config.js` file in your project root:

```javascript
module.exports = {
  source: {
    include: ['src/'], // Directories to scan for documentation
    exclude: ['node_modules/', 'dist/', 'build/'], // Directories to exclude
  },
  opts: {
    destination: './specs/', // Where to output generated specs
    recurse: true,
    verbose: true,
  },
  plugins: [
    'plugins/markdown',
  ],
  templates: {
    cleverLinks: false,
    monospaceLinks: false,
  },
};
```

### 2. Create Generator Script

Create the script that will run Speckit:

```bash
mkdir -p scripts
```

Then create `scripts/generate-specs.js`:

```javascript
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function generateSpecs() {
  console.log('Generating specs with Speckit...');

  // Create specs directory if it doesn't exist
  await fs.ensureDir('./specs');

  // Run JSDoc to generate specs from code comments
  const jsdocConfig = path.join(__dirname, '../jsdoc.config.js');

  exec(`npx jsdoc -c ${jsdocConfig}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating specs: ${error}`);
      return;
    }
    console.log(`Specs generated successfully: ${stdout}`);
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
  });
}

generateSpecs();
```

### 3. Create JSDoc Configuration

Create `jsdoc.config.js`:

```javascript
module.exports = {
  source: {
    include: ['src/', 'backend/'], // Directories to scan
    exclude: ['node_modules/', 'dist/', 'build/'], // Directories to exclude
  },
  opts: {
    destination: './specs/', // Output directory
    recurse: true,
    verbose: true,
    template: 'node_modules/minami', // A clean JSDoc template
  },
  plugins: [
    'plugins/markdown',
    'plugins/summarize',
    'plugins/underscore-docdash'
  ],
  templates: {
    cleverLinks: false,
    monospaceLinks: false,
    default: {
      outputSourceFiles: true,
    },
  },
};
```

## Environment Configuration

### 1. Create Environment File

Create a `.env` file in the project root (do not commit to version control):

```
ALGOLIA_APP_ID=your_algolia_app_id
ALGOLIA_API_KEY=your_algolia_api_key
ALGOLIA_INDEX_NAME=your_index_name
```

### 2. Update Docusaurus Config

Update your `docusaurus.config.js` to use environment variables:

```javascript
algolia: {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_API_KEY,
  indexName: process.env.ALGOLIA_INDEX_NAME,
  contextualSearch: true,
  searchPagePath: 'search',
},
```

## Verification

After installation, verify everything works:

1. **Run development server**:
   ```bash
   npm start
   ```

2. **Generate specs**:
   ```bash
   npm run generate:specs
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

If all commands run successfully, your Speckit + Docusaurus installation is complete!