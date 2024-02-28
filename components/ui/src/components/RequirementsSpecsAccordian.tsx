import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkdown from "react-markdown";
import { Box, Button, CircularProgress, Dialog, FormControl, FormControlLabel, Menu, MenuItem, Modal, Paper, Radio, RadioGroup } from "@mui/material";
import { SRSFormat } from "../custom-types/CustomTypes";
import { useState } from "react";
import { AutorenewTwoTone } from "@mui/icons-material";


type RequirementsSpecsAccordianProps = {
  handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  expanded: Array<string>;
  requirementsSpec: any;
  loadingRequirementsSpecs: boolean;
  handleRequirementsSpecButtonClick: (selectedValue: string) => Promise<void>;
  handleContextMenu: (event: React.MouseEvent<HTMLElement>) => void;
  requirementsExpl: any;
  loadingRequirementsExpl: boolean;
  anchorEl: HTMLElement | null;
  handleCloseMenu: () => void;
  position: {
    top: number;
    left: number;
  };
  handleCloseModal: () => void;
  handleShowDetails: () => Promise<void>;
  modalOpen: boolean;
}

export const RequirementsSpecsAccordian = ({ handleChange, expanded, requirementsSpec, loadingRequirementsSpecs,
  handleRequirementsSpecButtonClick, handleContextMenu, requirementsExpl, loadingRequirementsExpl,
  anchorEl, handleCloseMenu, position, handleCloseModal, handleShowDetails, modalOpen }: RequirementsSpecsAccordianProps) => {


  const [selectedValue, setSelectedValue] = useState('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue((event.target as HTMLInputElement).value);
    // Send selectedValue to your backend API here
  };
  return (
    <Accordion
      expanded={expanded.includes("panel2")}
      onChange={handleChange("panel2")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2d-content"
        id="panel2d-header"
        sx={{
          backgroundColor: (theme) => {
            if (expanded.includes("panel2")) {
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
        <Typography sx={{
          fontSize: 26,
          fontWeight: 500,
          lineHeight: 1.5,
        }}>
          Requirements Specifications
        </Typography>
      </AccordionSummary>
      <AccordionDetails>

        {loadingRequirementsSpecs ? (
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
            {requirementsSpec ? (
              <Typography
                variant="body2"
                gutterBottom
                onContextMenu={handleContextMenu}
              >
                <ReactMarkdown>{requirementsSpec}</ReactMarkdown>
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
                  This document defines the functional and non-functional requirements of the application, serving as a shared understanding between stakeholders and developers.
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={selectedValue}
                    onChange={handleRadioChange}
                    sx={{
                      display:"flex",
                      flexDirection:"row"
                    }}
                  >
                    <FormControlLabel value={SRSFormat.IEEE_29141} control={<Radio />} label={SRSFormat.IEEE_29141} />
                    <FormControlLabel value={SRSFormat.ISO_IEC_25010} control={<Radio />} label={SRSFormat.ISO_IEC_25010} />
                  </RadioGroup>
                </FormControl>
                <Button
                  onClick={() => handleRequirementsSpecButtonClick(selectedValue)}
                  variant="contained"
                  disabled={!selectedValue}
                  startIcon={<AutorenewTwoTone />}
                  sx={{
                    mt: 2,
                  }}
                >
                  Generate
                </Button>
              </div>
            )}
          </div>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorReference="anchorPosition"
          anchorPosition={{ top: position.top, left: position.left }}
        >
          <MenuItem
            sx={{
              backgroundColor: "action.selected",
              borderRadius: '0',

            }}
            onClick={handleShowDetails}>
            Explain
          </MenuItem>
        </Menu>
        <Dialog
          open={modalOpen}
          onClose={handleCloseModal}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "auto",
            backdropFilter: 'blur(3px)',
            scrollbarColor: 'rgba(0,0,0,.1)',
          }}

        >
          <Box style={{ padding: 16, margin: 16 }}>
            {loadingRequirementsExpl ? (
              <CircularProgress />
            ) : (
              <>
                <Typography variant="body2" gutterBottom>
                  <ReactMarkdown>{requirementsExpl}</ReactMarkdown>
                </Typography>
              </>
            )}
          </Box>
        </Dialog>
      </AccordionDetails>
    </Accordion>
  )
}