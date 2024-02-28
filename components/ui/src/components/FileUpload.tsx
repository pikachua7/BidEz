import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Typography } from "@mui/material";

type FileUploadProps = {
  handleFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
};

export const FileUpload = ({
  handleFileUpload: handleFileUpload,
}: FileUploadProps) => {
  return (
    <>
      {/* File upload button */}
      <label
        htmlFor="fileInput"
        style={{
          cursor: "pointer",
          marginRight: "30px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: 10,
            border: "2px dotted",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="file"
            id="fileInput"
            multiple
            required
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <AddCircleOutlineIcon fontSize="large" />
          <Typography
            variant="subtitle1"
            style={{ marginTop: "5px" }}
            color="text.primary"
          >
            Add file
          </Typography>
        </div>
      </label>
    </>
  );
};
