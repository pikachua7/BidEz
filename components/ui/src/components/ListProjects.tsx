import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Project } from "../custom-types/CustomTypes";

type ListProjectsProps = {
    projectsList:Project[]
}

export const ListProjects = ({projectsList}: ListProjectsProps) => {
  return (
    <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
          >
            {projectsList.map(
              (
                {
                  name,
                  client_name,
                  open_date,
                  close_date,
                  business_unit,
                  status,
                  id,
                  bid_owner
                }: Project,
                index
              ) => (
                <Card
                  key={index}
                  component={Link}
                  href={`/project-details/${id}`}
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
                        
                        <div style={{display:"flex", alignItems:"center", marginTop:"5px"}}>
                        <ViewQuiltRoundedIcon style={{marginRight:"8px"}} color="primary" />
                        <Typography
                          color="text.primary"
                          variant="h6"
                          fontWeight="bold"
                          >
                           {name}
                        </Typography>

                        </div>
                        <Chip
                          label={status === "IN_PROGRESS"?"In progress":"Closed"}
                          size="small"
                          sx={{
                            background: (theme) =>
                              theme.palette.mode === "light" ? "none" : "none",
                            backgroundColor:
                              status !== "IN_PROGRESS" ? "success.main" : "warning.dark",
                            "& .MuiChip-label": {
                              color: "white",
                            },
                            
                          }}
                        />
                      </Box>

                      <Divider sx={{ my: 1 }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        <Box sx={{ flex: 1, textAlign: "left" }}>
                          <Typography variant="body2" sx={{ mb: 1, fontWeight:"bold" }}>
                            Client Name
                          </Typography>
                          <Typography variant="body1" color="text.secondary">{client_name}</Typography>
                        </Box>
                        <Box sx={{ flex: 1, textAlign: "left" }}>
                          <Typography variant="body2" sx={{ mb: 1 ,fontWeight:"bold"}}>
                            Open Date
                          </Typography>
                          <Typography variant="body1" color="text.secondary">{open_date}</Typography>
                        </Box>
                        <Box sx={{ flex: 1, textAlign: "left" }}>
                          <Typography variant="body2" sx={{ mb: 1,fontWeight:"bold" }}>
                            Bid Owner
                          </Typography>
                          <Typography variant="body1" color="text.secondary">{bid_owner.firstname + " " + bid_owner.lastname}</Typography>
                        </Box>
                        <Box sx={{ flex: 1, textAlign: "left" }}>
                          <Typography variant="body2" sx={{ mb: 1,fontWeight:"bold" }}>
                            Business Unit
                          </Typography>
                          <Typography variant="body1" color="text.secondary">{business_unit}</Typography>
                        </Box>
                      </Box>
                      
                    </Box>
                  </Box>
                </Card>
              )
            )}
          </Stack>
  )
}