import axios from "axios";
import { CreateProject, Project } from "../custom-types/CustomTypes";

const API_URL = process.env.REACT_APP_API_URL;

export const projects = async (bidOwnerId: number): Promise<Project[]> => {
  try {
    const response = await axios.get<Project[]>(
      `${API_URL}/projects?bid_owner_id=${bidOwnerId}`
    );
    return response.data;
  } catch (error: any) {
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

export const createProject = async (
  projectData: CreateProject
): Promise<Project> => {
  try {
    const response = await axios.post<Project>(
      `${API_URL}/projects`,
      projectData
    );
    return response.data;
  } catch (error: any) {
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

export const getProjectById = async (projectId: number): Promise<Project> => {
  try {
    const response = await axios.get<Project>(
      `${API_URL}/projects/${projectId}`
    );
    return response.data;
  } catch (error: any) {
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

export const uploadDocuments = async (
  projectId: number,
  files: FileList
): Promise<Project> => {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const response = await axios.post(
      `${API_URL}/projects/${projectId}/documents`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
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

export const downloadDocument = async (
  projectId: number,
  documentId: number
): Promise<void> => {
  try {
    const response = await axios.get(
      `${API_URL}/projects/${projectId}/documents/${documentId}/download`,
      {
        responseType: "blob",
      }
    );

    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", `document_${documentId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error: any) {
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

export const deleteDocument = async (
  projectId: number,
  documentId: number
): Promise<void> => {
  try {
    await axios.delete(
      `${API_URL}/projects/${projectId}/documents/${documentId}`
    );
  } catch (error: any) {
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
