<!--
Sync Impact Report:
Version change: none → 1.0.0
Added sections: All initial principles and governance structure
Templates requiring updates: none (new file)
Modified principles: none
Removed sections: none
⚠ pending: None
 -->

# Project Constitution

## Governance Information
- **Project Name**: Physical AI & Humanoid Robotics Course
- **Constitution Version**: 1.0.0
- **Ratification Date**: 2025-12-10
- **Last Amended Date**: 2025-12-10
- **Maintainers**: [TO BE DEFINED]

## Core Principles

### 1. Educational Excellence
Documentation and curriculum must prioritize clarity, accessibility, and practical applicability for students across diverse backgrounds. All materials must include hands-on exercises, real-world applications, and progressive learning pathways.

**Rationale**: Ensures the course remains accessible and effective for learners at varying skill levels while maintaining academic rigor appropriate for advanced robotics education.

### 2. Technical Accuracy
All technical content must reflect current best practices in Physical AI, ROS 2, NVIDIA Isaac, and humanoid robotics platforms. Content must be verified against actual hardware and software implementations before publication.

**Rationale**: Maintains credibility and ensures students learn industry-standard approaches rather than obsolete or theoretical concepts.

### 3. Modular Architecture
Course content must be organized in discrete, interoperable modules allowing flexible sequencing and customization for different educational contexts and student interests.

**Rationale**: Enables instructors to adapt the curriculum to specific program requirements, time constraints, and student specializations while maintaining pedagogical coherence.

### 4. Hardware-Software Integration
All documentation must bridge hardware and software considerations, emphasizing the tight coupling required in physical AI and humanoid robotics applications.

**Rationale**: Physical AI inherently combines mechanical, electrical, and software systems; curriculum must reflect this integration rather than treating components in isolation.

### 5. Industry Alignment
Course content must align with current industry practices, tools, and employment requirements in robotics and AI sectors.

**Rationale**: Ensures graduates possess relevant, marketable skills and that the curriculum remains valuable for career preparation.

### 6. Open Source Foundation
Wherever possible, course materials must utilize open-source tools, platforms, and methodologies to ensure accessibility and community support.

**Rationale**: Reduces barriers to entry for students and institutions while promoting engagement with active developer communities.

## Technical Standards

### 7. Documentation Format
All course materials must use Docusaurus with standardized frontmatter, consistent styling, and cross-referenced navigation. Content must be written in Markdown with appropriate code blocks, diagrams, and media assets.

### 8. Code Quality
All example code must follow established conventions for each platform (ROS 2, NVIDIA Isaac, etc.) with appropriate error handling, documentation, and testing guidelines.

### 9. Accessibility Compliance
All content must meet WCAG 2.1 AA standards ensuring accessibility for students with disabilities.

## Change Management

### Amendment Procedure
Changes to this constitution require:
1. Proposal with rationale documented in GitHub Issues
2. Community review period of 14 days minimum
3. Approval by project maintainers
4. Update to constitution with version increment

### Versioning Policy
- Major: Fundamental changes to educational philosophy or core technical stack
- Minor: Addition of significant new principles or major structural changes
- Patch: Clarifications, corrections, or minor adjustments

### Compliance Review
Quarterly audits will verify ongoing adherence to constitutional principles with remediation plans for any deviations.

# Deployment Instructions

For initial setup and deployment, follow these steps:

1. Install the Vercel CLI if you haven't already:
   ```bash
   npm i -g vercel
   ```

2. Navigate to your project directory:
   ```bash
   cd "C:\Users\MISS FILZA DANISH\projects\book-mw"
   ```

3. Log in to Vercel:
   ```bash
   vercel login
   ```
   - A browser window will open for you to enter the device code or log in. Once approved, return to the terminal.

4. Set your Vercel token:
   ```bash
   set VERCEL_TOKEN=PASTE_YOUR_TOKEN_HERE
   ```

5. Deploy your project:
   ```bash
   vercel --prod --token %VERCEL_TOKEN% --confirm
   ```

Ensure you have committed all changes to your version control system before deploying.