import { Accordion, AccordionSummary, Typography, AccordionDetails, CircularProgress, Button } from "@mui/material"
import ReactMarkdown from "react-markdown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import remarkGfm from "remark-gfm";
import { AutorenewTwoTone } from "@mui/icons-material";

type TechStackAccordianProps = {
    handleChange:(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    expanded: Array<string>;
    loadingTechStack:boolean;
    techStack:any;
    handleTechStack:() => Promise<void>
}
export const TechStackAccordian = ({expanded,handleChange,loadingTechStack,techStack,handleTechStack}: TechStackAccordianProps) => {
  return (
    <Accordion
                expanded={expanded.includes("panel5")}
                onChange={handleChange("panel5")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel5d-content"
                  id="panel5d-header"
                  sx={{
                    backgroundColor: (theme) => {
                      if (expanded.includes("panel5")) {
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
                    Tech Stack
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {loadingTechStack ? (
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
                      {techStack ? (
                        <Typography
                          variant="body2"
                          gutterBottom
                          
                        >
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{techStack}</ReactMarkdown>
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
                          This refers to the collection of programming languages, frameworks, databases, and other technologies we'll leverage to build the application.
                          </Typography>
                          <Button
                            onClick={handleTechStack}
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