---
id: 1
title: "initial-constitution-setup"
stage: "constitution"
date_iso: "2025-12-10"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "none"
branch: "master"
user: "user"
command: "/sp.constitution"
labels: ["constitution", "setup", "initialization"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml: |
  - .specify/memory/constitution.md
  - .specify/templates/spec-template.md
  - .specify/templates/plan-template.md
  - .specify/templates/tasks-template.md
  - .specify/templates/phr-template.prompt.md
  - specs/physical-ai-foundations/spec.md
  - specs/physical-ai-foundations/plan.md
  - specs/physical-ai-foundations/tasks.md
  - docusaurus.config.js
  - sidebars.js
  - docs/intro.md
  - docs/course/intro.md
  - docs/course/learning-objectives.md
  - docs/course/prerequisites.md
  - docs/physical-ai/intro.md
  - docs/physical-ai/embodied-intelligence.md
  - history/README.md
tests_yaml: |
  - "none"
---

# Initial Constitution Setup

## Context
$ARGUMENTS

Below is a **ready-to-use, polished, high-power prompt** you can paste into **ChatGPT, Cursor, Claude or any LLM** to generate a **complete Docusaurus + SpecKit Documentation Constitution File** for your Physical AI & Humanoid Robotics course/book.

This prompt is written professionally and instructs the model to produce a structured, multi-file documentation skeleton with navigation, sidebar, folder structure, and content mapping based on the entire course description you provided.

---

# ✅ **Your Final Prompt (Copy–Paste Ready)**

**PROMPT START ———————————————————**

You are an expert technical documentation architect specializing in **SpecKit**, **Docusaurus**, **AI Robotics**, and **Physical AI curriculum design**.
Using the complete course description below, generate a **fully structured Constitution File** (documentation architecture) for a **Docusaurus + SpecKit** project.

The Constitution File must:

1. Define the **full documentation tree** (sections, subsections, chapters).
2. Map content into **folders & markdown files** with clean naming conventions.
3. Include **sidebars.js structure** and **speckit.json structure**.
4. Include **front-matter templates** for each major section.
5. Clearly separate **Student Handbook**, **Instructor Guide**, **Module Guides**, and **Hardware Lab Setup**.
6. Organize the book into **logical parts**, including:

   * Physical AI Foundations
   * ROS 2
   * Digital Twin (Gazebo/Unity)
   * NVIDIA Isaac Platform
   * Humanoid Robotics Engineering
   * Vision-Language-Action
   * Capstone Project
   * Hardware Requirements, Lab Architecture, Budget Models
7. Include an **appendix** with glossaries, diagrams placeholders, and equipment BOMs.
8. Write the constitution using clear hierarchy, JSON + YAML examples, and markdown file structure.
9. Do NOT write full content—only the **documentation constitution** and structure.

---

### **Insert Course Description for the Model**

(Include everything below exactly as provided)

[PASTE ALL COURSE DESCRIPTION YOU GAVE ABOVE — FROM "Physical AI & Humanoid Robotics" DOWN TO THE END — WITHOUT CHANGING ANYTHING]

---

After processing the course description, produce the following:

### **OUTPUT FORMAT REQUIRED**

#### **1. Project Structure Overview**

* Folder tree
* Naming conventions
* Docusaurus root structure
* Where SpecKit files go

#### **2. Docusaurus Sidebars (sidebar.js example)**

* Auto-generated + manual section configs

#### **3. SpecKit spec file (speckit.json)**

* Define collections (modules), documents, roles
* Tags and metadata

#### **4. Constitution File**

A detailed hierarchical outline including all chapters, subchapters, and markdown file names.
Example:

```
/docs/
  physical-ai/
    intro.md
    embodied-intelligence.md
  ros2/
    index.md
    nodes-topics-services.md
    ...
```

#### **5. File Templates**

Provide 3–5 templates that will be used repeatedly:

* Module Overview Template
* Lab Exercise Template
* Hardware Setup Template
* Capstone Project Template
* API/ROS Node Reference Template

Each template should include proper Docusaurus front-matter.

#### **6. Appendix Layout**

* Glossary
* BOM (Bill of Materials)
* Troubleshooting
* Cloud vs On-Premise Lab models

---

### **STYLE REQUIREMENTS**

* Clean, readable, professional
* Typography consistent with robotics documentation
* Use bullet points + code blocks extensively
* Avoid verbosity; focus on structure and clarity
* DO NOT generate lesson content—only architecture

---

Now generate the **complete Docusaurus + SpecKit Documentation Constitution File** based on the entire provided course description.

**PROMPT END ———————————————————**

---

# ✅ **Your Prompt Is Ready**

If you want, I can also generate:

✅ A ready-made **Docusaurus starter project**
✅ A complete **SpecKit-ready folder** you can directly copy into VS Code
✅ A GitHub-ready repository structure
✅ A PDF-style Table of Contents for book publishing
Just tell me: **"Generate ful

## Response Summary
Created the initial project constitution and supporting infrastructure for the Physical AI & Humanoid Robotics course. This included:
- Core constitution file with educational principles
- SpecKit templates for specs, plans, and tasks
- Initial course specification for Physical AI Foundations
- Docusaurus configuration aligned with course content
- Documentation structure with appropriate sidebars
- Basic course content files to demonstrate the structure

## Outcome
The project now has a complete SpecKit + Docusaurus infrastructure for the Physical AI & Humanoid Robotics course. The constitution establishes educational principles and governance, while the technical infrastructure supports modular, scalable course development.

## Evaluation
The implementation successfully creates the documentation constitution as requested, with proper folder structure, templates, and initial content that aligns with the Physical AI & Humanoid Robotics curriculum requirements.