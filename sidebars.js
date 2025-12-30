// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Main Documentation Sidebar
  docsSidebar: [
    {
      type: 'category',
      label: 'Overview',
      items: [
        'overview',
        'features',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started',
        'installation',
        'speckit-integration',
      ],
    },
    {
      type: 'category',
      label: 'How Speckit Works',
      items: [
        'running-generator',
        'integrating-existing-code',
      ],
    },
    {
      type: 'category',
      label: 'Documentation',
      items: [
        'documentation/overview',
        'documentation/structure',
        'documentation/auto-generation',
      ],
    },
    {
      type: 'category',
      label: 'API Documentation',
      items: [
        'api/overview',
        'api/reference',
      ],
    },
    {
      type: 'category',
      label: 'Best Practices',
      items: [
        'best-practices',
        'faqs',
      ],
    },
  ],
};

export default sidebars;
