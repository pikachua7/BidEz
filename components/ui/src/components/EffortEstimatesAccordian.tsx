import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkdown from "react-markdown";
import { Button, CircularProgress } from "@mui/material";
import remarkGfm from "remark-gfm";
import { AutorenewTwoTone } from "@mui/icons-material";


type ClientProfileAccordianProps = {
    handleChange:(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    expanded: Array<string>;
    effortEstimates:any;
    handleEffortEstimates: () => Promise<void>
    loadingEffortEstimates:boolean
}

export const EffortEstimateAccordian = ({handleChange,expanded,effortEstimates,loadingEffortEstimates,handleEffortEstimates}: ClientProfileAccordianProps) => {
  return (
    <Accordion
                expanded={expanded.includes("panel7")}
                onChange={handleChange("panel7")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel7d-content"
                  id="panel7d-header"
                  sx={{
                    backgroundColor: (theme) => {
                      if (expanded.includes("panel7")) {
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
                    Effort Estimates
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {loadingEffortEstimates ? (
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
                      {effortEstimates ? (
                        <Typography
                          variant="body2"
                          gutterBottom
                          
                        >
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{effortEstimates}</ReactMarkdown>
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
Project effort estimates predict time and resources needed to complete tasks. Think of it as setting a "work budget" to guide planning, budgeting, and resource allocation for smooth project execution.
                          </Typography>
                          <Button
                            onClick={handleEffortEstimates}
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