import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiBackDrop from "../MuiBackDrop";
import { useSingupMutation } from "../../Redux/api/LoginRegister";

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

export default function SingUpModal({
  open,
  handleClose,
}: // handleOpen,
{
  open: any;
  handleClose: any;
  handleOpen: any;
}) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    condirmPassword: "",
  });

  // api
  const [singup, { isLoading }] = useSingupMutation();
  const [loginError, setRegisterError] = React.useState("");
  const [loginSucess, SetRegistarSratus] = React.useState("");
  // comnfirm password

  const [confirmPassword, setConfirmPassword] = React.useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "condirmPassword") {
      if (formData.password === value) {
        console.log("password matcheddddd");
        setConfirmPassword(true);
      } else {
        console.log("password not matched");
        setConfirmPassword(false);
      }
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, borderRadius: "5px" }}>
          <MuiBackDrop open={isLoading} />
          <Stack direction="row" justifyContent="space-between">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              pb={3}
            >
              Singup Modal
            </Typography>
            <Stack>
              <Button color="error" onClick={handleClose}>
                <CloseIcon />
              </Button>
            </Stack>
          </Stack>
          <Box>
            <form action="" style={{}}>
              <Box
                justifyContent="center"
                display="flex"
                flexDirection="column"
                gap={2}
                marginBottom="10PX"
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
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                />
                <TextField
                  name="condirmPassword"
                  placeholder="Confirm Password"
                  value={formData.condirmPassword}
                  onChange={handleInputChange}
                  error={!confirmPassword}
                  helperText={!confirmPassword ? "Password not matched" : ""}
                  type="password"
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
                      let res = await singup(formData);
                      console.log(res);

                      let copy: any = res;
                      if (!copy.error) {
                        // localStorage.setItem("token", copy.data.token);
                        SetRegistarSratus("Register sucessFull");
                        setRegisterError("");

                        // setTimeout(() => {
                        //   handleClose();
                        // }, 3000);
                      } else {
                        setRegisterError(copy.error.data.status);
                        SetRegistarSratus("");
                      }
                    } catch (error) {
                      console.log("error==", error);
                    }
                  }}
                  variant="contained"
                >
                  Sing Up
                </Button>
              </Stack>
              <Box pt={2}></Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
