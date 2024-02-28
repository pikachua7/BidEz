import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Documents, Project, SRSFormat } from "../custom-types/CustomTypes";
import {
  getArchitectureMermaidScript,
  getBusinessFlows,
  getClientProfileAnalysis,
  getEffortEstimates,
  getRequiredArchitectureTypes,
  getRequirementsExplaination,
  getRequirementsPersonas,
  getRequirementsSpec,
  getTechStack,
} from "../services/Analysis";

import {
  deleteDocument,
  getProjectById,
  uploadDocuments,
} from "../services/Projects";
import { BusinessFlowsAccordian } from "./BusinessFlowsAccordian";
import { ClientProfileAccordian } from "./ClientProfileAccordian";
import { DisplayFiles } from "./DisplayFiles";
import { FileUpload } from "./FileUpload";
import { ProjectInfo } from "./ProjectInfo";
import { RequirementsPersonasAccordian } from "./RequirementsPersonasAccordian";
import { RequirementsSpecsAccordian } from "./RequirementsSpecsAccordian";
import { TechStackAccordian } from "./TechStackAccordian";
import { ArcitectureDiagramAccordian } from "./ArchitectureDiagramAccordian";
import { EffortEstimateAccordian } from "./EffortEstimatesAccordian";



type Props = {};

export const ProjectDetails = (props: Props) => {
  const [expanded, setExpanded] = useState<Array<string>>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Documents[]>([]);
  const { projectId } = useParams();
  const [project, setProject] = useState<Project>({} as Project);
  const [clientProfileData, setClientProfileData] = useState<any>(null);
  const [effortEstimates, setEffortEstimates] = useState<any>(null)
  const [loadingEffortEstimates, setloadingEffortEstimates] = useState<boolean>(false)
  const [loadingClientProfile, setLoadingClientProfile] = useState<any>(null)
  const [loadingRequirementsSpecs, setLoadingRequirementsSpec] =
    useState(false);
  const [loadingRequirementsExpl, setLoadingRequirementsExpl] = useState(false);
  const [loadingRequirementsPersonas, setLoadingRequirementsPersonas] =
    useState(false);
  const [loadingBusinessFlow, setLoadingBusinessFlow] = useState(false);
  const [loadingTechStack, setLoadingTechStack] = useState(false);
  const [requirementsSpec, setRequirementsSpec] = useState(null);
  const [requirementsExpl, setRequirementsExpl] = useState(null);
  const [requirementsPersonas, setRequirementsPersonas] = useState(null);
  const [businessFlows, setBusinessFlows] = useState(null);
  const [techStack, setTechStack] = useState(null);


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState({ top: 0, left: 0 });


  // State Variables required for panel 5 (Architecture Diagram)
  const [openArchitecturePanelFirst, setOpenArchitecturePanelFirst] = useState(false);
  const [requiredArchitectureTypesReasoning, setRequiredArchitectureTypesReasoning] = useState<string | null>(null);
  const [isArchitectureDiagramLoadingOuter, setIsArchitectureDiagramLoadingOuter] = useState(false);



  const handleChange =
    (panel: string) => async (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded([...expanded, panel]);
      if (!isExpanded) {
        const arr = expanded.filter((item) => item !== panel);
        setExpanded(arr);
      }
      
      if (panel === 'panel1' && !clientProfileData) {

        setLoadingClientProfile(true);
        try {
          const clientProfile = await getClientProfileAnalysis(Number(projectId));
          console.log(clientProfile);
          setClientProfileData(clientProfile.response_content);
        } catch (error) {
          console.error("Error fetching client profile analysis:", error);
        }
        finally {
          setLoadingClientProfile(false);
        }

      }
    };

  // Fetch Project by id
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectDetails = await getProjectById(Number(projectId));
        console.log(projectDetails);
        setProject(projectDetails);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
    fetchProject();
  }, []);

  // Get Documents from DB for a project
  useEffect(() => {
    if (project?.documents) {
      setUploadedFiles(project.documents);
    }
  }, [project?.documents]);

  const { documents, team_members, id, status, name, ...restOfTheData } =
    project;

  const filteredProjectInfoData = Object.entries(restOfTheData).filter(
    ([key, value]) => value != null
  );

  const filteredTeamMembersInfo = Object.entries(project).filter(
    ([key]) => key === "team_members"
  );


  // File Upload
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      try {
        const updatedProject = await uploadDocuments(Number(projectId), files);
        setUploadedFiles(updatedProject.documents);
      } catch (err) { }
    }
  };

  // Handle Remove Files
  const handleRemoveFile = async (documentId: number) => {
    try {
      await deleteDocument(Number(projectId), documentId);
      setUploadedFiles(uploadedFiles.filter((file) => file.id !== documentId));
    } catch (err) { }
  };

  // Handle Requirements Specs Button
  const handleRequirementsSpecButtonClick = async (selectedValue: string) => {
    setLoadingRequirementsSpec(true);

    try {
      const requirementsSpec = await getRequirementsSpec(Number(projectId), selectedValue);
      setRequirementsSpec(requirementsSpec.response_content);
    } catch (err) {
    } finally {
      setLoadingRequirementsSpec(false);
    }
  };

  // Handle Requirements Personas Button
  const handleRequirementsPersonasButtonClick = async () => {
    setLoadingRequirementsPersonas(true);
    try {
      const requirementsPersonas = await getRequirementsPersonas(
        Number(projectId)
      );
      setRequirementsPersonas(requirementsPersonas.response_content);
    } catch (err) {
    } finally {
      setLoadingRequirementsPersonas(false);
    }
  };


  // Handle Business Flows Button
  const handleBusinessFlows = async () => {
    setLoadingBusinessFlow(true);
    try {
      const businessFlow = await getBusinessFlows(Number(projectId));
      setBusinessFlows(businessFlow.response_content);
    } catch (err) {
    } finally {
      setLoadingBusinessFlow(false);
    }
  };

  // Handle Tech Stack Button
  const handleTechStack = async () => {
    setLoadingTechStack(true);
    try {
      const techStack = await getTechStack(Number(projectId));
      setTechStack(techStack.response_content);
    } catch (err) {
    } finally {
      setLoadingTechStack(false);
    }
  };

  // Handle Tech Stack Button
  const handleEffortEstimates = async () => {
    setloadingEffortEstimates(true);
    try {
      const effortEstimate = await getEffortEstimates(Number(projectId));
      setEffortEstimates(effortEstimate.response_content);
    } catch (err) {
    } finally {
      setloadingEffortEstimates(false);
    }
  };


  // Handle Context Menu for selecting text  
  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const rect = range?.getBoundingClientRect();
    setAnchorEl(event.currentTarget);
    setSelectedText(window.getSelection()?.toString() || "");
    if (rect) {
      setPosition({
        top: rect.top - 30, // Adjust as needed to position the menu above the selected text
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
  };

  // Handle Menu Close
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Handle Modal Close
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Handle Show Details Menu Button
  const handleShowDetails = async () => {
    handleCloseMenu();
    setModalOpen(true);
    try {
      setLoadingRequirementsExpl(true);
      const requirementsExplanation = await getRequirementsExplaination(
        Number(projectId), selectedText
      );
      console.log(requirementsExplanation);
      setRequirementsExpl(requirementsExplanation);
    } catch (err) {
    } finally {
      setLoadingRequirementsExpl(false);
    }
  };



  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 8 } }}>
      <Grid container>
        {/* Project Analysis */}
        <Grid item xs={12} md={12}>
          <Container
            id="faq"
            sx={{
              pt: { xs: 4, sm: 12 },
              pb: { xs: 8, sm: 16 },
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: { xs: 3, sm: 6 },
              width: "100%",
            }}
          >
            {/* Project Heading */}
            <Typography
              component="h1"
              variant="h1"
              color="text.primary"
              sx={{
                width: { sm: "100%", md: "60%" },
                textAlign: { sm: "left", md: "left" },
              }}
            >
              {project.name}
            </Typography>

            {/* Project Info */}
            <ProjectInfo project={project} />
            {/* Upload Files */}
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {/* File Upload */}
              <FileUpload handleFileUpload={handleFileUpload} />

              {/* Display Uploaded Files */}
              <DisplayFiles
                projectId={Number(projectId)}
                uploadedFiles={uploadedFiles}
                handleRemoveFile={handleRemoveFile}
              />
            </div>

            {/* Accordians */}
            <Box sx={{ width: "100%" }}>
              {/* Client Profile Accordian */}
              <ClientProfileAccordian expanded={expanded} handleChange={handleChange}
                clientProfileData={clientProfileData} loadingClientProfile={loadingClientProfile} />
              {/* Requirements Specs Accordian */}
              <RequirementsSpecsAccordian
                expanded={expanded}
                handleChange={handleChange}
                requirementsSpec={requirementsSpec}
                loadingRequirementsSpecs={loadingRequirementsSpecs}
                handleRequirementsSpecButtonClick={handleRequirementsSpecButtonClick}
                handleContextMenu={handleContextMenu}
                loadingRequirementsExpl={loadingRequirementsExpl}
                requirementsExpl={requirementsExpl}
                anchorEl={anchorEl}
                handleCloseMenu={handleCloseMenu}
                position={position}
                handleCloseModal={handleCloseModal}
                handleShowDetails={handleShowDetails}
                modalOpen={modalOpen}
              />
              {/* Requirements Persona Accordian */}
              <RequirementsPersonasAccordian
                expanded={expanded}
                handleChange={handleChange}
                requirementsPersonas={requirementsPersonas}
                handleRequirementsPersonasButtonClick={handleRequirementsPersonasButtonClick}
                loadingRequirementsPersonas={loadingRequirementsPersonas}
              />
              {/* Business Flow Accordian */}
              <BusinessFlowsAccordian
                expanded={expanded}
                handleChange={handleChange}
                businessFlows={businessFlows}
                handleBusinessFlows={handleBusinessFlows}
                loadingBusinessFlow={loadingBusinessFlow}
              />

              {/* Tech Stack Accordian */}
              <TechStackAccordian expanded={expanded}
                handleChange={handleChange}
                techStack={techStack}
                handleTechStack={handleTechStack}
                loadingTechStack={loadingTechStack} />

              {/* Requirements Specs Accordian */}
              <ArcitectureDiagramAccordian
                expanded={expanded}
                handleChange={handleChange}
                requiredArchitectureTypesReasoning={requiredArchitectureTypesReasoning}
                // isArchitectureDiagramLoadingOuter={isArchitectureDiagramLoadingOuter}
                // setIsArchitectureDiagramLoadingOuter={setIsArchitectureDiagramLoadingOuter}
                // setRequiredArchitectureTypesReasoning={setRequiredArchitectureTypesReasoning}
                projectId={projectId}
              />
              {/* Effort Estimates */}
              <EffortEstimateAccordian expanded={expanded}
                handleChange={handleChange}
                effortEstimates={effortEstimates}
                handleEffortEstimates={handleEffortEstimates}
                loadingEffortEstimates={loadingEffortEstimates} />
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};
