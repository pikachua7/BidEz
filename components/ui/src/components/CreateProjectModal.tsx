import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  alpha,
  useThemeProps,
} from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import { BuNameList } from "../utils/Constants";

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  handleCreateProject: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
}

export const CreateProjectModal = ({
  open,
  onClose,
  handleCreateProject,
}: ModalFormProps) => {
  const theme = useThemeProps;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
        backdropFilter: 'blur(3px)',
        scrollbarColor: 'rgba(0,0,0,.1)'

      }}
      PaperProps={{
        sx: (theme) => ({
          borderRadius: "10px",
          outline: "2px solid",
          outlineColor:
            theme.palette.mode === "light"
              ? alpha("#BFCCD9", 0.5)
              : alpha("#9CCCFC", 0.1),
          boxShadow:
            theme.palette.mode === "light"
              ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
              : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
          backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "black",
          backdropFilter: 'blur(1000px)'
        }),
        
      }}
    >
      <DialogTitle>
        New Bid
        <Divider sx={{ mt: 1 }} />
      </DialogTitle>
      <form onSubmit={handleCreateProject}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Project Name"
                name="projectName"
                defaultValue={"Security Tokenization"}
                fullWidth
                sx={{ height: "100%" }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Client Name"
                name="clientName"
                defaultValue={"IDFC First Bank"}
                fullWidth
                sx={{ height: "100%" }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Business Unit"
                name="buName"
                fullWidth
                sx={{ height: "100%" }}
                required
              >
                
                {BuNameList.map((buName: any, index: number) => (
                  <MenuItem key={index} value={buName}>
                    {buName}
                  </MenuItem>
                ))}
               
              </TextField>
              
            </Grid>
            
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
