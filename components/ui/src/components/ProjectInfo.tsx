
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
import { Project } from "../custom-types/CustomTypes";
import { AvatarGroup, Avatar } from "@mui/material";

type ProjectInfoProps = {
    project:Project
}

export const ProjectInfo = ({project}: ProjectInfoProps) => {
  return (
    <Box sx={{ width: "100%" }}>
              <Card
                sx={{
                  p: 2,
                  height: "fit-content",
                  width: "100%", // Ensure each card takes full width
                  backgroundColor:'action.selected',
                    
                    borderColor: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return 'primary.light';
                      }
                      return 'primary.dark';
                    },
                  }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    textAlign: "left",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { md: "center" },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === "light") {
                          return "grey.300";
                        }
                        return "grey.700";
                      },
                    }}
                  >
                    <ViewQuiltRoundedIcon style={{marginRight:"8px"}} color="primary" />
                  </Box>
                  <Box
                    sx={{
                      width: "100%", // Ensure content box takes full width
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    {/* Content of your card */}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <Box sx={{ flex: 1, textAlign: "left" }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Client Name
                        </Typography>
                        <Typography variant="h6">
                          {project.client_name}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, textAlign: "left" }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Open Date
                        </Typography>
                        <Typography variant="h6">
                          {project.open_date}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, textAlign: "left" }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Bid Owner
                        </Typography>
                        <Typography variant="h6">
                          {project?.bid_owner?.firstname + " " + project?.bid_owner?.lastname}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: 1, textAlign: "left" }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Business Unit
                        </Typography>
                        <Typography variant="h6">
                          {project.business_unit}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "left" }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Team Members
                        </Typography>
                        <AvatarGroup max={3} className="team-members">
                        <Avatar alt="Aashay" aria-label="Aashay" src="/static/images/avatar/aashay.png" />
                        <Avatar alt="Travis Howard" src="/static/images/avatar/shannon.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </AvatarGroup>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Box>
  )
}