# Quickstart Guide for AI-Native Textbook Development

## For Developers

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-textbook
   ```

2. **Install dependencies**
   ```bash
   # For Docusaurus frontend
   npm install

   # For FastAPI backend
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory with:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   QDRANT_URL=your_qdrant_cluster_url
   QDRANT_API_KEY=your_qdrant_api_key
   NEON_DATABASE_URL=your_neon_database_url
   BETTER_AUTH_SECRET=your_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   ```

4. **Run the development servers**
   ```bash
   # Terminal 1: Run Docusaurus
   npm start

   # Terminal 2: Run FastAPI backend
   cd backend
   uvicorn main:app --reload
   ```

### Project Structure

```
ai-textbook/
├── docs/                    # Textbook content
├── src/                     # Docusaurus custom components
├── backend/                 # FastAPI backend
│   ├── api/                 # API routes
│   ├── models/              # Data models
│   ├── services/            # Business logic
│   └── main.py              # Application entry point
├── contracts/               # API contracts (OpenAPI)
├── specs/                   # Specifications and plans
└── docusaurus.config.js     # Docusaurus configuration
```

## For Content Creators

### Creating a New Chapter

1. **Create the chapter file**
   - Add a new `.md` file in the appropriate part directory
   - Use the standard frontmatter template:

   ```markdown
   ---
   title: "Chapter Title"
   sidebar_position: X
   description: "Brief description of the chapter"
   learning_objectives:
     - Understand X
     - Learn Y
     - Be able to Z
   prerequisites:
     - Chapter A
     - Concept B
   difficulty_level: intermediate
   estimated_time: 45
   ---
   ```

2. **Include personalization hooks**
   - Use content blocks for different difficulty levels
   - Add hardware-specific examples where applicable
   - Include subagent integration points

3. **Add to navigation**
   - Update `sidebars.js` to include your new chapter

### Content Templates

**Standard Chapter Template:**
```markdown
---
# Frontmatter (see above)
---

# Chapter Title

## Learning Objectives
- Objective 1
- Objective 2
- Objective 3

## Introduction
Brief introduction to the topic...

## Main Content
Detailed explanations, examples, and exercises...

## Summary
Key takeaways from the chapter...

## Exercises
Practice problems for the student...

## Further Reading
Additional resources for deeper learning...
```

## For AI Integration

### Adding a New Subagent

1. **Define the subagent in the database**
   - Add entry to subagents table with name, type, and description
   - Define input and output schemas

2. **Create the API endpoint**
   - Add route in `backend/api/subagents.py`
   - Implement the business logic in `backend/services/subagents.py`

3. **Integrate with the frontend**
   - Add UI component for the subagent
   - Connect to the appropriate chapters

### Working with the RAG System

1. **Index new content**
   - Content is automatically indexed when published
   - Manual indexing available via admin API

2. **Monitor performance**
   - Use the analytics dashboard
   - Review user feedback and queries

## Deployment

### Production Deployment

1. **Set up production environment variables**
   ```env
   NODE_ENV=production
   DATABASE_URL=production_database_url
   # ... other production variables
   ```

2. **Build the frontend**
   ```bash
   npm run build
   ```

3. **Deploy to production**
   - Frontend to GitHub Pages (via GitHub Actions)
   - Backend to cloud platform (Render, Railway, etc.)

### CI/CD Pipeline

The project uses GitHub Actions for automated testing and deployment:
- Code is tested on pull requests
- Merges to main trigger production deployment
- API contracts are validated automatically

## Troubleshooting

### Common Issues

**API Rate Limits**: Implement caching and optimize API usage
**Slow Page Loads**: Check embedding sizes and optimize RAG queries
**Authentication Issues**: Verify environment variables and Better-Auth configuration
**Translation Problems**: Check OpenAI API key and rate limits

### Performance Monitoring

- Monitor API response times
- Track database query performance
- Watch for memory usage in the RAG system
- Analyze user engagement metrics

## Getting Help

- Check the detailed technical documentation in the `/docs` directory
- Review the API contracts in `/contracts`
- Consult the implementation plan in `/specs/1-ai-textbook/plan.md`
- Reach out to the development team for complex issues