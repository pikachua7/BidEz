export interface User {
  email: string;
  firstname: string;
  lastname: string;
  id: number;
}
export interface Project {
  id: number;
  name: string;
  bid_owner: User;
  business_unit: string;
  status: string;
  open_date: string;
  close_date: string;
  documents: any[]; // You can replace 'any' with a specific type for documents
  team_members: any[]; // You can replace 'any' with a specific type for team members
  client_name: string;
}

export interface TeamMember {
  project_id: number;
  role: string;
  user: User;
}

export interface Documents {
  file_name: string;
  id: number;
}

export interface CreateProject {
  name: string;
  bid_owner_id: number;
  status?: string;
  business_unit: string;
  open_date: string;
  client_name: string;
  team_members: any[];
}

export enum SRSFormat {
  ISO_IEC_25010 = "ISO_IEC_25010",
  IEEE_29141 = "IEEE_29141"
}