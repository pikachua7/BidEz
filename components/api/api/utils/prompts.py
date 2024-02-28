from api.schemas.project_analysis import PromptType

prompt_templates = {
    PromptType.CLIENT_PROFILE: """Tell me information about {client_name}.
Include following sections in your response {company_profile_params}.
Format your response as markdown.""",
    PromptType.REQUIREMENTS_SPEC: """{document_text}
Understand the above requirements. Your job is to create a list of detailed requirements.
Use the best software requirement specification standard with headings, sections and sub-sections.
Your response should be at least 3 pages.
Generate the response in {format}
Format your response as markdown.""",
    PromptType.REQUIREMENTS_EXPLANATION: """'{requirement}'.
For the above content enclosed in '',
Explain the requirement in more detail.
Use language specific to applicable domain.
Give an example if possible.
Suggest reference material to understand the process as prescribed by a governing body if applicable.
Format your response as markdown.""",
    PromptType.PERSONAS: """Figure out an exhaustive list of all the stakeholders that will be a part of the solution.
List down all the use cases for each those personas.
Format your response as markdown""",
    PromptType.BUSINESS_FLOWS: """Elaborate the business workflows in terms of user actions for each use case listed earlier.
Format your response as markdown""",
    PromptType.TECH_STACK: """List the best technology stack to use to build this solution.
Format your response as a table.
Include reasoning for each technology/tool as a column.
Format your response as markdown""",
    PromptType.EFFORT_ESTIMATES: """With the technology stack you suggested create a task break down structure.
Assuming the developers are experts in these technologies estimate efforts in person days to build the application.
Format your response as a table.
The columns should be Requirement, Task, Effort Estimate (Person Days), Assumptions.
State your assumption for arriving at the effort estimate.
Format your response as markdown""",
    PromptType.ARCHITECTURE_SUGGESTIONS: """
Please suggest possible architecture patterns that can be used for developing this solution.
Consider best practices, security, performance & maintainability.
Also consider the tech stack options suggested earlier. 
Format your response as markdown listing the reasoning behind why the suggested patterns should be used.
""",
    PromptType.ARCHITECTURE_DIAGRAM: """
Based on the tech stack generated above, create a "mermaid script" using "graph TB" which shows an exhaustive systems component diagram of the application. 
The diagram should follow "microservice" and "event-driven" pattern. 
Ensure that the mermaid script is syntactically correct for the mermaid version 10.8.0. 
Subgraph titles should be strictly one-worded (Do not include space character in the titles). 
Subgraph titles must not be the same as graph definition. 
Output only the mermaid script and nothing else.""",
}
