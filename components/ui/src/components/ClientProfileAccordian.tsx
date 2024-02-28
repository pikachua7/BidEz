import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkdown from "react-markdown";
import { CircularProgress } from "@mui/material";
import { gray } from "../getLPTheme";


type ClientProfileAccordianProps = {
  handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  expanded: Array<string>;
  clientProfileData: any;
  loadingClientProfile: boolean
}

export const ClientProfileAccordian = ({ handleChange, expanded, clientProfileData, loadingClientProfile }: ClientProfileAccordianProps) => {
  return (
    <Accordion
      expanded={expanded.includes("panel1")}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1d-content"
        id="panel1d-header"
        sx={{
          backgroundColor: (theme) => {
            if (expanded.includes("panel1")) {
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
        <Typography
          sx={{
            fontSize: 26,
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          Client Profile
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {loadingClientProfile ? (
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
        ) : (<Typography
          variant="body2"
          gutterBottom
          sx={{
            width: { sm: "100%", md: "100%" },
            overflowY: " auto",
            maxHeight: "600px",
          }}
        >
          <ReactMarkdown>{clientProfileData}</ReactMarkdown>
        </Typography>)}

      </AccordionDetails>
    </Accordion>
  )
}