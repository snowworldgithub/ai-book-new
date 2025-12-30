---
sidebar_position: 1
---

# Documentation Overview

Learn about the documentation system for the AI-Native Physical AI & Humanoid Robotics textbook project.

## Documentation Types

The project includes several types of documentation:

### User Documentation
- **Tutorials**: Step-by-step guides for learning concepts
- **How-to guides**: Task-oriented instructions
- **Reference**: Detailed technical information
- **Explanation**: Conceptual overviews and background

### Developer Documentation
- **API Reference**: Auto-generated from code
- **Architecture**: System design and components
- **Specifications**: Generated from codebase
- **Best Practices**: Coding and documentation standards

## Documentation Structure

```
docs/                    # User documentation
├── overview.md          # Project overview
├── features.md          # Feature documentation
├── getting-started.md   # Getting started guide
├── installation.md      # Installation instructions
├── speckit-integration.md # Speckit integration
├── running-generator.md # Generator usage
├── integrating-existing-code.md # Code integration
├── best-practices.md    # Best practices
├── faqs.md              # Frequently asked questions
├── documentation/       # Documentation about documentation
│   ├── overview.md      # This file
│   ├── structure.md     # Documentation structure
│   └── auto-generation.md # Auto generation process
├── api/                 # API documentation
│   ├── overview.md      # API overview
│   └── reference.md     # API reference
└── guides/              # Tutorial guides
    ├── setup.md         # Setup guide
    └── examples.md      # Examples guide

specs/                   # Auto-generated specifications
├── components/          # Component specs
├── api/                 # API specs
├── modules/             # Module specs
└── summary.json         # Spec summary

guides/                  # Extended guides
api/                     # API documentation
```

## Writing Documentation

### Documentation Standards

All documentation should follow these standards:

- **Clarity**: Write in clear, simple language
- **Completeness**: Include all necessary information
- **Consistency**: Use consistent terminology and formatting
- **Examples**: Provide practical examples where applicable
- **Accuracy**: Ensure information is technically correct

### Markdown Guidelines

Use standard Markdown with Docusaurus extensions:

```markdown
---
sidebar_position: 1
---

# Page Title

Content here...

## Section

More content...

### Subsection

Detailed information...
```

### Frontmatter

Include appropriate frontmatter in documentation files:

```yaml
---
title: Page Title
description: Brief description of the page content
sidebar_position: 1  # Position in sidebar
tags: [tag1, tag2]   # Tags for search
---
```

## Documentation Process

### Creating New Documentation

1. **Identify the need**: Determine what documentation is needed
2. **Choose the type**: Select appropriate documentation type
3. **Write the content**: Follow documentation standards
4. **Add examples**: Include practical examples
5. **Review**: Have others review the documentation
6. **Publish**: Add to appropriate location in the structure

### Maintaining Documentation

- **Keep it current**: Update documentation when code changes
- **Regular reviews**: Periodically review for accuracy
- **User feedback**: Incorporate feedback from users
- **Version control**: Track changes with Git

## Documentation Tools

### Docusaurus Features

- **Versioning**: Support for multiple documentation versions
- **Search**: Integrated search functionality
- **Internationalization**: Support for multiple languages
- **Markdown**: Rich Markdown support with extensions
- **Custom components**: Ability to add custom React components

### Speckit Integration

- **Auto-generation**: Automatic generation from code
- **API docs**: Auto-generated API documentation
- **Component specs**: Component specifications
- **Integration**: Seamless integration with Docusaurus

## Quality Assurance

### Review Process

All documentation should go through a review process:

1. **Technical review**: Verify technical accuracy
2. **Content review**: Check for clarity and completeness
3. **Style review**: Ensure consistency with standards
4. **User testing**: Test with actual users

### Metrics

Track documentation quality with metrics:

- **Page views**: Which pages are most viewed
- **Time on page**: How long users spend on pages
- **Bounce rate**: How often users leave quickly
- **Feedback**: User feedback and suggestions
- **Search queries**: What users search for