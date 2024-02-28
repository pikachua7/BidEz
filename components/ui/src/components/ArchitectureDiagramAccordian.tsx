import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkdown from "react-markdown";
import { Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { getArchitectureMermaidScript, getRequiredArchitectureTypes } from "../services/Analysis";
import { Mermaid, MermaidProps } from "../utils/Mermaid";
import { AutorenewTwoTone } from "@mui/icons-material";



type ArcitectureDiagramAccordianProps = {
    handleChange:(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    expanded: Array<string>;
    requiredArchitectureTypesReasoning:any;
   
    projectId: string | undefined;
}

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};


export const ArcitectureDiagramAccordian = ({handleChange,expanded, projectId}: ArcitectureDiagramAccordianProps) => {
  
  const [architectureMermaidScript, setArchitectureMermaidScript] = useState<string | null>(null);
  const [isArchitectureDiagramLoadingOuter, setIsArchitectureDiagramLoadingOuter] = useState(false);
  const [architectureData,setArchitectureData] = useState<any>(null)


  const mermaidProps: MermaidProps = {
    text: architectureMermaidScript!
  };

  // Handle Architecture Diagram Button
  const handleArchitectureDiagramButtonClick = async () => {
   

    try {
      setIsArchitectureDiagramLoadingOuter(true);
      const archData = await getRequiredArchitectureTypes(Number(projectId));
      setArchitectureData(archData);
      // const architectureMermaidScript = await getArchitectureMermaidScript(Number(projectId));
      // console.log('architectureMermaidScript', architectureMermaidScript);
      const hardcode_1 = `graph LR
      subgraph UI
        A[Investor Portal] --> B(API Gateway)
        C[Equity Firm Portal] --> B
      end
    
      subgraph Core Services
        B --> D(User Management)
        D --> A
        D --> C
        B --> E(Offering Management)
        E --> A
        E --> C
        B --> F(Token Management)
        F --> B(blockchain events)
        B --> G(Compliance Service)
        G --> F
      end
    
      subgraph External Systems
        H(Transfer Agent System) --> B
        I(KYC/AML Provider) --> G
        J(Regulatory Rgrapheporting) --> G
      end
    
      B --> K{Cache}
      D --> K
      E --> K
      F --> K
    
      style UserManagement green
      style OfferingManagement orange
      style TokenManagement blue
      style ComplianceService purple
      style Cache gray`
      console.log('hardcode_1', hardcode_1);

      // setRequiredArchitectureTypesReasoning(null);
      setArchitectureMermaidScript(hardcode_1);
        
    } catch (err) {
    } finally {
      setIsArchitectureDiagramLoadingOuter(false);
      // setIsArchitectureDiagramLoadingInner(false);
    }
  };


  return (
    <Accordion
                expanded={expanded.includes("panel6")}
                onChange={handleChange("panel6")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel6d-content"
                  id="panel6d-header"
                  sx={{
                    backgroundColor: (theme) => {
                      if (expanded.includes("panel6")) {
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
                    Architecture Diagram
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {isArchitectureDiagramLoadingOuter ? (
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
                      {architectureData && architectureMermaidScript ? (
                        <>
                        <Typography
                          variant="body2"
                          gutterBottom
                        >
                          <ReactMarkdown>{architectureData}</ReactMarkdown>
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                              <Mermaid {...mermaidProps} />
                         </Typography>
                        </>
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
                          The architecture diagram is a visual blueprint depicting the application's high-level structure and how its components interact and communicate, providing a clear understanding of the system's organization.
                          </Typography>
                          <Button
                            onClick={handleArchitectureDiagramButtonClick}
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