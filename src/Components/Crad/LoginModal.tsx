import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Stack } from "@mui/material";
import SingUpModal from "./SingUpModal";
import CloseIcon from "@mui/icons-material/Close";

import { useLoginMutation } from "../../Redux/api/LoginRegister";
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

export default function LoginModal({
  open,
  handleCloseLoginModal,
}: {
  open: any;
  handleCloseLoginModal: any;
  handleOpenLoginModal: any;
}) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [singUpModalOpen, setOpen] = React.useState(false);
  const handleOpenSingModal = () => setOpen(true);
  const handleCloseSingUpModal = () => setOpen(false);
  // login api
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();
  const [loginError, setLoginError] = React.useState("");
  const [loginSucess, SetLoginSratus] = React.useState("");
  const [timer, setTimer] = React.useState(0);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseLoginModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, borderRadius: "5px" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              id="modal-modal-title"
              variant="h6"
              pb={2}
              component="h2"
            >
              Login Modal
            </Typography>
            <Stack>
              <Button color="error" onClick={handleCloseLoginModal}>
                <CloseIcon />
              </Button>
            </Stack>
          </Stack>
          <SingUpModal
            handleClose={handleCloseSingUpModal}
            open={singUpModalOpen}
            handleOpen={handleOpenSingModal}
          />
          <MuiBackDrop open={isLoading} />
          <Box>
            <form action="">
              <Box
                justifyContent="center"
                display="flex"
                flexDirection="column"
                gap={2}
                marginBottom="10px"
              >
                <TextField
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <TextField
                  name="password"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ margin: "2% 0", color: "red" }}>
                <Typography textAlign="center" fontWeight={700}>
                  {loginError}
                </Typography>
                <Typography textAlign="center" fontWeight={700}>
                  {loginSucess}
                </Typography>
              </Box>

              <Stack direction="row" justifyContent="center">
                <Button
                  onClick={async () => {
                    try {
                      let res = await login(formData);
                      let copy: any = res;
                      if (!copy.error) {
                        localStorage.setItem("token", copy.data.token);
                        SetLoginSratus("Login sucessFull");
                        setLoginError("");

                        setTimeout(() => {
                          handleCloseLoginModal();
                        }, 3000);
                      } else {
                        setLoginError(copy.error.data.status);
                        SetLoginSratus("");
                      }
                    } catch (error) {
                      console.log("error==", error);
                    }
                  }}
                  variant="contained"
                >
                  Login
                </Button>
              </Stack>
              <Box pt={2}>
                <Typography>
                  don't haver an account{" "}
                  <span
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => {
                      console.log("a tag working");
                      handleOpenSingModal();
                    }}
                  >
                    <u>
                      <i>SingUp?</i>
                    </u>
                  </span>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
