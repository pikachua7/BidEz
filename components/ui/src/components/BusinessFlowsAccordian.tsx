import { Accordion, AccordionSummary, Typography, AccordionDetails, CircularProgress, Button } from "@mui/material"
import ReactMarkdown from "react-markdown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AutorenewTwoTone } from "@mui/icons-material";

type BusinessFlowsAccordianProps = {
    handleChange:(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    expanded: Array<string>;
    loadingBusinessFlow:boolean;
    businessFlows:any;
    handleBusinessFlows:() => Promise<void>
}

export const BusinessFlowsAccordian = ({handleChange,expanded,loadingBusinessFlow,businessFlows,handleBusinessFlows}: BusinessFlowsAccordianProps) => {
  return (
     <Accordion
                expanded={expanded.includes("panel4")}
                onChange={handleChange("panel4")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4d-content"
                  id="panel4d-header"
                  sx={{
                    backgroundColor: (theme) => {
                      if (expanded.includes("panel4")) {
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
                    Business Flows
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {loadingBusinessFlow ? (
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
                      {businessFlows ? (
                        <Typography
                          variant="body2"
                          gutterBottom
                        >
                          <ReactMarkdown>{businessFlows}</ReactMarkdown>
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
                          These map the user journeys within the app, detailing the steps users take to achieve specific goals.
                          </Typography>
                          <Button
                            onClick={handleBusinessFlows}
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