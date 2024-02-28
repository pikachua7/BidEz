export type ProjectType = {
  id?: number;
  name: string;
  open_date: string;
  close_date?: string;
  business_unit: string;
  status: string;
  bid_owner_id: number;
  bid_owner?: string;
  client_name?: string;
  documents?: any;
  team_members?: any;
};
export enum bidState {
  ACTIVE = "active",
  CLOSED = "closed",
}
export const BuNameList = [
  "Banking and Capital Market",
  "FinTech_Taxation and Accounting",
  "HLS Healthcare",
  "Horizontal Markets",
  "IBM Cloud and Security",
  "SalesForce_BFSI",
];
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
