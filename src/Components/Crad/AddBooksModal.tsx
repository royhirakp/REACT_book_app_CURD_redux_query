import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Stack } from "@mui/material";
import LoginModal from "./LoginModal";
import CloseIcon from "@mui/icons-material/Close";
import { useAddBooksMutation } from "../../Redux/api/LoginRegister";
import MuiBackDrop from "../MuiBackDrop";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,

  p: 4,
};

export default function AddBooksModal({
  open,
  handleClose,
  handleOpen,
  Loginopen,
  setLoginOpen,
  refetch,
}: {
  open: any;
  handleClose: any;
  handleOpen: any;
  Loginopen: any;
  setLoginOpen: any;
  refetch: any;
}) {
  const [addBooks, { isLoading, isSuccess }] = useAddBooksMutation();
  const [formData, setFormData] = React.useState({
    title: "",
    author: "",
    imageUrl: "",
    description: "",
    ratting: 0,
  });

  const [urlError, setUrlError] = React.useState(false);
  const [errorTitelStatus, setTitelerror] = React.useState(false);
  const [errorAutherStatus, setAuthererror] = React.useState(false);

  // logiin popup
  // const [Loginopen, setOpen] = React.useState(false);
  const handleOpenLoginModal = () => setLoginOpen(true);
  const handleCloseLoginModal = () => setLoginOpen(false);
  const [addbookErro, setAddbookError] = React.useState(true);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const urlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/;

    if (value.length > 11) {
      if (name === "imageUrl" && !urlPattern.test(value)) {
        // alert("Please enter a valid URL.");
        setUrlError(true);
        // return; // Prevent setting invalid URL
      } else setUrlError(false);
    } else setUrlError(false);

    // handel error of title and auther
    if (name === "title") {
      if (formData.title == "") {
        setTitelerror(true);
      } else setTitelerror(false);
    }

    if (name === "author") {
      if (formData.author === "") {
        setAuthererror(true);
      } else {
        // console.log("autheorrrrr if conditiponnnn", formData.author);

        setAuthererror(false);
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // error handel titel and auther

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, borderRadius: "5px" }}>
          <LoginModal
            open={Loginopen}
            handleOpenLoginModal={handleOpenLoginModal}
            handleCloseLoginModal={handleCloseLoginModal}
          />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h2">
              Add Books
            </Typography>
            <Stack>
              <Button color="error" onClick={handleClose}>
                <CloseIcon />
              </Button>
            </Stack>
          </Stack>

          <Box>
            <form action="">
              <Box
                justifyContent="center"
                display="flex"
                flexDirection="column"
                gap={2}
                marginBottom="10PX"
              >
                <TextField
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  error={errorTitelStatus}
                  helperText={`${
                    errorTitelStatus ? "Title can't be empty" : ""
                  }`}
                />
                <TextField
                  id="time"
                  name="author"
                  placeholder="Author"
                  value={formData.author}
                  onChange={handleInputChange}
                  error={errorAutherStatus}
                  helperText={`${
                    errorAutherStatus ? "Auther can't be empty" : ""
                  }`}
                />
                <TextField
                  id="time"
                  name="imageUrl"
                  placeholder="Image URL"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  error={urlError}
                  helperText={`${urlError ? "Invalid url" : ""}`}
                />
                <TextField
                  id="time"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Box>
              <Typography color="error">
                {!addbookErro ? " Error !  login again" : ""}
              </Typography>
              <Typography color="error" textAlign="center">
                {isSuccess ? "BOOK ADDED" : ""}
              </Typography>
              <Typography>
                <span
                  onClick={() => handleOpenLoginModal()}
                  style={{ cursor: "pointer" }}
                >
                  <b>
                    <u>
                      <i>click to Login</i>
                    </u>
                  </b>
                </span>
              </Typography>

              <Stack direction="row" justifyContent="center">
                <Button
                  onClick={async () => {
                    try {
                      console.log(formData);

                      if (formData.title == "") {
                        setTitelerror(true);
                      } else setTitelerror(false);
                      if (formData.author == "") {
                        setAuthererror(true);
                      } else setAuthererror(false);

                      if (!localStorage.getItem("token")) {
                        alert(
                          "you have to login first. ckick ok to go to the login modal"
                        );
                        handleOpenLoginModal();
                      } else {
                        let result: any = await addBooks(formData);
                        let errorhansel = { ...result };
                        // console.log("add book workingggggg", formData, result);
                        if (!result.data) {
                          setAddbookError(false);
                        } else {
                          setAddbookError(true);
                        }
                        // setRefresh((prev: any) => !prev);
                        refetch();
                      }
                    } catch (error) {
                      console.log("eerrror comming");
                      console.log(error);
                    }
                  }}
                  variant="contained"
                >
                  Submit
                  {isLoading ? "loading.." : ""}
                </Button>
                <MuiBackDrop open={isLoading} />
              </Stack>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
