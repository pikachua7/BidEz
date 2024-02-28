import axios from "axios";
import { SRSFormat } from "../custom-types/CustomTypes";

const API_URL = process.env.REACT_APP_API_URL;

export const getClientProfileAnalysis = async (
  projectId: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_URL}/projects/${projectId}/analysis/client-profile`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching client profile analysis:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }
};



export const getRequirementsSpec = async (
  projectId: number, format: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_URL}/projects/${projectId}/analysis/requirements-spec`,
      {
        params: {
          format: format
        }
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching requirements-specs analysis:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }
};

export const getRequirementsExplaination = async (
  projectId: number, selectedText: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_URL}/projects/${projectId}/analysis/requirement-explanation`,
      {
        "requirement": selectedText
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching requirements-explanation analysis:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }
};

export const getRequirementsPersonas = async (
  projectId: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_URL}/projects/${projectId}/analysis/requirement-personas`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching requirements-personas:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }
};

export const getBusinessFlows = async (
  projectId: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_URL}/projects/${projectId}/analysis/business-flows`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching  business flows:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }
};

export const getTechStack = async (
  projectId: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_URL}/projects/${projectId}/analysis/tech-stack`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching tech stack:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }
};

export const getRequiredArchitectureTypes = async (
  projectId: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_URL}/projects/${projectId}/analysis/required-architecture-types`
    );
    return response.data;
    // // TODO : Remove hardcode and return response data
    // return {
    //   "arch_patterns": ['Microservices Architecture', 'Event-Driven Architecture (EDA)', 'API-First Design'],
    //   "reasoning": `# Reasoning for Suggested Architecture Patterns:\n\n**Microservices Architecture:**\n\n* **Benefits:**
    //   * **Scalability:** Individual services can scale independently based on demand.
    //   * **Maintainability:** Easier to develop, update, and deploy individual services.
    //   * **Technology Choice:** Aligns well with the suggested stack of popular frameworks for backend development.
    // * **Considerations:**
    //     * Increased complexity in managing and orchestrating multiple services.
    //     * Requires robust API communication and data consistency mechanisms.
    // \n\n**Event-Driven Architecture:**\n\n* **Benefits:**
    //     * **Flexibility:** Enables asynchronous communication and decoupling between services, facilitating future changes and integrations.
    //     * **Performance:** Can improve responsiveness and handle large volumes of events efficiently.
    // * **Considerations:**
    //     * Requires robust event messaging infrastructure and error handling mechanisms.
    //     * Debugging and tracing issues across distributed events can be complex.
    // \n\n**API-First Design:**\n\n* **Benefits:**
    //     * **Clear interfaces:** Promotes well-defined and documented communication between platform components and external systems.
    //     * **Flexibility:** Enables easier integration with future features and third-party applications.
    // * **Considerations:**
    //     * Requires upfront planning and design effort for all potential APIs.
    //     * Might introduce additional overhead for managing and versioning APIs.
    // \n\n**Overall:**\n\nCombining these patterns can create a robust and scalable architecture. Microservices provide modularity and maintainability, EDA enables flexible event handling and performance, and API-First design ensures clear communication and future-proofing. The specific combination and implementation will depend on the specific needs and priorities of the project.\n`
    // }
  } catch (error: any) {
    console.error("Error fetching required-architecture-types:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }
};

export const getArchitectureMermaidScript = async (
  projectId: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_URL}/projects/${projectId}/analysis/architecture-mermaid-script`);
    return response.data;
    // // TODO : Remove hardcode and return response data
    // return ` LR
    // subgraph UI
    //   A[Investor Portal] --> B(API Gateway)
    //   C[Equity Firm Portal] --> B
    // end
  
    // subgraph Core Services
    //   B --> D(User Management)
    //   D --> A
    //   D --> C
    //   B --> E(Offering Management)
    //   E --> A
    //   E --> C
    //   B --> F(Token Management)
    //   F --> B(blockchain events)
    //   B --> G(Compliance Service)
    //   G --> F
    // end
  
    // subgraph External Systems
    //   H(Transfer Agent System) --> B
    //   I(KYC/AML Provider) --> G
    //   J(Regulatory Rgrapheporting) --> G
    // end
  
    // B --> K{Cache}
    // D --> K
    // E --> K
    // F --> K
  
    // style UserManagement green
    // style OfferingManagement orange
    // style TokenManagement blue
    // style ComplianceService purple
    // style Cache gray`
    
  } catch (error: any) {
    console.error("Error fetching required-architecture-types:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }
};


export const getEffortEstimates = async (
  projectId: number
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_URL}/projects/${projectId}/analysis/effort-estimates`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching effort estimates:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      return error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
    }
  }
};