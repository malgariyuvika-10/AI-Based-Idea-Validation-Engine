# AI Agents Documentation

## Agent Architecture

The system follows a multi-agent workflow.

User Idea
    ↓
Coordinator Agent
    ↓
--------------------------------
| Market Agent               |
| Competitor Agent           |
| Feasibility Agent          |
| Financial Agent            |
| Risk Agent                 |
--------------------------------
    ↓
Scoring Agent
    ↓
Report Agent

## Agents

### 1. Coordinator Agent

Responsibilities:
- Receive idea
- Assign tasks
- Aggregate outputs

Inputs:
- Idea description

Outputs:
- Structured analysis request

### 2. Market Research Agent

Responsibilities:
- TAM/SAM/SOM Analysis
- Market Trends
- Industry Growth

### 3. Competitor Analysis Agent

Responsibilities:
- Competitor Discovery
- SWOT Analysis

### 4. Feasibility Agent

Responsibilities:
- Technical Complexity
- Resource Requirements

### 5. Financial Agent

Responsibilities:
- Revenue Potential
- Cost Estimation

### 6. Risk Assessment Agent

Responsibilities:
- Market Risks
- Regulatory Risks

### 7. Scoring Agent

Responsibilities:
- Calculate Validation Score
- Generate Recommendations

### 8. Report Agent

Responsibilities:
- Produce Final Validation Report