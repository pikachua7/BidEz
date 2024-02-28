import { Accordion, AccordionSummary, Typography, AccordionDetails, CircularProgress, Button } from "@mui/material"
import ReactMarkdown from "react-markdown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AutorenewTwoTone } from "@mui/icons-material";



type RequirementsPersonasAccordianProps = {
    handleChange:(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    expanded: Array<string>;
    loadingRequirementsPersonas:boolean;
    requirementsPersonas:any;
    handleRequirementsPersonasButtonClick:() => Promise<void>
}

export const RequirementsPersonasAccordian = ({handleChange,expanded,loadingRequirementsPersonas,requirementsPersonas,handleRequirementsPersonasButtonClick}: RequirementsPersonasAccordianProps) => {
  return (
    <Accordion
                expanded={expanded.includes("panel3")}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                  sx={{
                    backgroundColor: (theme) => {
                      if (expanded.includes("panel3")) {
                        if (theme.palette.mode === 'light') {
                          return 'action.selected';
                        }
                        return 'primary.dark';
                      }
                      return '';
                    },
                    borderColor: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return 'primary.light';
                      }
                      return 'primary.dark';
                    },
                  }}
                >
                  <Typography  sx={{
            fontSize: 26,
            fontWeight: 500,
            lineHeight: 1.5,
          }}>
                    Requirements Personas
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {loadingRequirementsPersonas ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <CircularProgress />
                    </div>
                  ) : (
                    <div style={{ width: "100%" }}>
                      {requirementsPersonas ? (
                        <Typography
                          variant="body2"
                          gutterBottom
                          
                        >
                          <ReactMarkdown>{requirementsPersonas}</ReactMarkdown>
                        </Typography>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Typography variant="body2" gutterBottom>
                          These are user archetypes representing key user groups, helping us understand their needs and guide development decisions
                          </Typography>
                          <Button
                            onClick={handleRequirementsPersonasButtonClick}
                            variant="contained"
                            color="primary"
                            startIcon={<AutorenewTwoTone/>}
                            sx={{
                              mt:2
                            }}
                          >
                            Generate
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
  )
}