import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { IconButton, Link, Paper, Typography } from "@mui/material";
import { downloadDocument } from "../services/Projects";
import { Documents } from "../custom-types/CustomTypes";

type DisplayFilesProps = {
  projectId: number;
  uploadedFiles: Documents[];
  handleRemoveFile: (index: number) => void;
};

export const DisplayFiles = ({
  uploadedFiles,
  handleRemoveFile,
  projectId,
}: DisplayFilesProps) => {
  const handleDownload = async (projectId: number, documentId: number) => {
    await downloadDocument(projectId, documentId);
  };

  return (
    <>
      {/* Display uploaded files */}
      {uploadedFiles.map((file, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            marginRight: "30px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <Link onClick={() => handleDownload(projectId, file.id)}>
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: 10,
                border: "2px solid",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={'/static/images/avatar/PDF_icons.png'} style={{ fontSize: 80 }} color="error" />
            </div>
          </Link>
          <Typography
            variant="subtitle2"
            style={{
              marginTop: "5px",
              maxWidth: "130px",
              overflowWrap: "anywhere",
            }}
          >
            {file.file_name}
          </Typography>
          {/* Cross icon */}
          <IconButton
            aria-label="remove"
            onClick={() => handleRemoveFile(file.id)}
            size="small"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      ))}
    </>
  );
};
