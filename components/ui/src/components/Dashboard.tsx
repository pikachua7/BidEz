import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { CreateProject, Project, User } from "../custom-types/CustomTypes";
import { createProject, projects } from "../services/Projects";
import { formatDate } from "../utils/Constants";
import { CreateProjectModal } from "./CreateProjectModal";
import { ListProjects } from "./ListProjects";

interface Props { }

export const Dashboard = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState<User>();
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBidType, setSelectedBidType] = useState("active");

  useEffect(() => {
    if (token) {
      const decodedTokenData = jwtDecode<User>(token);
      setUserData(decodedTokenData);
    }
  }, [token]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (userData?.id) {
          const projectsData = await projects(userData.id);
          console.log(projectsData);
          setProjectsList(projectsData);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [userData?.id]);

  const handleCreateProject = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const newProjectInfo: CreateProject = {
      name: event.currentTarget.projectName.value,
      bid_owner_id: userData?.id || -1,
      business_unit: event.currentTarget.buName.value,
      open_date: formatDate(new Date()),
      
      client_name: event.currentTarget.clientName.value,
      team_members: [],
    };
    try {
      const newProject = await createProject(newProjectInfo);
      setProjectsList([newProject, ...projectsList]);
    } catch (err) { }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography component="h2" variant="h4" color="text.primary">
              Dashboard
            </Typography>
            <Button
              color="primary"
              variant="contained"
              
              component="a"
              onClick={() => setIsModalOpen(true)}
            >
              Create Project
            </Button>
            <CreateProjectModal
              open={isModalOpen}
              onClose={handleCloseModal}
              handleCreateProject={handleCreateProject}
            />
          </div>

          <ListProjects projectsList={projectsList}/>
        </Grid>
      </Grid>
    </Container>
  );
};
