# Documentation Structure

Understand the organization and structure of the documentation system for the AI-Native Physical AI & Humanoid Robotics textbook.

## Organizational Principles

The documentation follows the "Diátaxis" framework with four distinct types of documentation:

### 1. Tutorials (Learning-oriented)
- **Purpose**: To get started and learn by doing
- **Format**: Step-by-step lessons
- **Audience**: Beginners who want to learn
- **Location**: `guides/` directory

### 2. How-to Guides (Task-oriented)
- **Purpose**: To accomplish specific tasks
- **Format**: Procedural instructions
- **Audience**: Users who know basics and need to get something done
- **Location**: `docs/` and `guides/` directories

### 3. Explanation (Understanding-oriented)
- **Purpose**: To understand concepts and principles
- **Format**: Conceptual overviews and background
- **Audience**: Users who need deeper understanding
- **Location**: `docs/` directory

### 4. Reference (Information-oriented)
- **Purpose**: To find specific information
- **Format**: Technical specifications and API docs
- **Audience**: Users who need detailed information
- **Location**: `docs/api/`, `specs/` directories

## Directory Structure

### Main Documentation (`docs/`)

```
docs/
├── overview.md                    # Project overview
├── features.md                    # Feature documentation
├── getting-started.md             # Getting started guide
├── installation.md                # Installation instructions
├── speckit-integration.md         # Speckit integration guide
├── running-generator.md           # Generator usage
├── integrating-existing-code.md   # Code integration guide
├── best-practices.md              # Best practices
├── faqs.md                        # Frequently asked questions
├── documentation/                 # Documentation about docs
│   ├── overview.md               # Documentation overview
│   ├── structure.md              # This file
│   └── auto-generation.md        # Auto generation process
├── api/                          # API documentation
│   ├── overview.md               # API overview
│   └── reference.md              # API reference
└── guides/                       # Tutorial guides
    ├── setup.md                  # Setup guide
    └── examples.md               # Examples guide
```

### Generated Specifications (`specs/`)

```
specs/
├── components/                   # Component specifications
│   ├── Button.spec.md           # Button component spec
│   ├── RobotController.spec.md  # Robot controller spec
│   └── ...                      # Other components
├── api/                         # API specifications
│   ├── robot-control.spec.md    # Robot control API spec
│   ├── navigation.spec.md       # Navigation API spec
│   └── ...                      # Other API specs
├── modules/                     # Module specifications
│   ├── kinematics.spec.md       # Kinematics module spec
│   ├── perception.spec.md       # Perception module spec
│   └── ...                      # Other modules
├── services/                    # Service specifications
│   ├── auth.spec.md             # Authentication service spec
│   └── ...                      # Other services
└── summary.json                 # Summary of all specs
```

### Extended Guides (`guides/`)

```
guides/
├── setup/                        # Setup guides
│   ├── environment.md            # Environment setup
│   ├── hardware.md               # Hardware setup
│   └── software.md               # Software setup
├── tutorials/                    # Step-by-step tutorials
│   ├── basic-movement.md         # Basic robot movement
│   ├── sensor-integration.md     # Sensor integration
│   └── ...                       # Other tutorials
├── how-to/                       # How-to guides
│   ├── create-component.md       # How to create a component
│   ├── add-api-endpoint.md       # How to add an API endpoint
│   └── ...                       # Other how-to guides
└── advanced/                     # Advanced topics
    ├── optimization.md           # Performance optimization
    ├── security.md               # Security considerations
    └── ...                       # Other advanced topics
```

### API Documentation (`api/`)

```
api/
├── overview.md                   # API overview
├── authentication.md             # Authentication guide
├── robot-control/                # Robot control API
│   ├── index.md                  # Robot control overview
│   ├── movement.md               # Movement endpoints
│   ├── sensors.md                # Sensor endpoints
│   └── ...                       # Other robot control endpoints
├── ai-services/                  # AI services API
│   ├── chatbot.md                # Chatbot endpoints
│   ├── translation.md            # Translation endpoints
│   └── ...                       # Other AI service endpoints
└── reference/                    # Full API reference
    ├── openapi.json              # OpenAPI specification
    └── swagger-ui.html           # Swagger UI interface
```

## Navigation Structure

### Sidebar Organization

The documentation is organized into multiple sidebars:

1. **Main Docs Sidebar** (`docs/`):
   - Overview and getting started
   - Core features and functionality
   - Integration guides
   - Best practices and FAQs

2. **Guides Sidebar** (`guides/`):
   - Setup and configuration
   - Tutorials and examples
   - How-to guides

3. **API Sidebar** (`api/`):
   - API overview
   - Service-specific documentation
   - Full reference

4. **Specs Sidebar** (`specs/`):
   - Generated component specs
   - API specifications
   - Module documentation

## Content Organization

### Progressive Disclosure

Documentation follows progressive disclosure principles:

- **High-level concepts** first
- **Detailed information** available as needed
- **Practical examples** throughout
- **Links to related content**

### Cross-References

Use cross-references to connect related documentation:

```markdown
For more information about ROS 2 integration, see [ROS 2 Setup Guide](../guides/ros2-setup.md).

See also the [API Reference](../api/reference.md) for detailed technical specifications.
```

### Consistency Patterns

Maintain consistency across documentation:

- **Standard headers**: Use consistent header structure
- **Terminology**: Use consistent technical terms
- **Formatting**: Apply consistent formatting patterns
- **Examples**: Use consistent example formats

## Metadata and SEO

### Frontmatter Standards

All documentation files include appropriate frontmatter:

```yaml
---
title: Page Title
description: Brief description for SEO
sidebar_position: 1  # Position in sidebar (if applicable)
tags: [tag1, tag2]   # Tags for search and categorization
---

# Page Title

Content...
```

### Internal Linking

Use relative links for internal navigation:

```markdown
[See the installation guide](./installation.md)
[API Reference](../api/reference.md)
```

## Maintenance Strategy

### Version Control

- Documentation is versioned with the codebase
- Changes tracked in Git with clear commit messages
- Review process for documentation changes
- Regular audits for accuracy and relevance

### Automated Generation

- Specifications automatically generated from code
- API documentation from route definitions
- Component documentation from source code
- Regular regeneration to maintain accuracy