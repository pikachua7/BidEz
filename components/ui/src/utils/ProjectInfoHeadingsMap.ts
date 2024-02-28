// Create string,string map in typescript

export const projectInfoHeadingsMap = (heading: string) => {
  let projectInfoHeadingsMap: Map<string, string> = new Map([
    ["name", "Project Name"],
    ["bid_owner", "Bid Owner"],
    ["business_unit", "Business Unit"],
    ["open_date", "Open Date"],
    ["close_date", "Close Date"],
    ["team_members", "Team Members"],
    ["client_name", "Client Name"],
  ]);

  return projectInfoHeadingsMap.get(heading);
};
