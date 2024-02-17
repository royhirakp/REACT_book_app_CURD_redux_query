import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "../Components/Crad/CommentCard";

import {
  useMakeCommentMutation,
  useGetUnitPostQuery,
} from "../Redux/api/LoginRegister";
import LoginModal from "../Components/Crad/LoginModal";
import MuiBackDrop from "../Components/MuiBackDrop";

const BookDisplay = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetUnitPostQuery({ id: id });
  const [state, setState] = useState({});
  useEffect(() => {
    setState(data?.book[0]);
  }, [data]);
  return (
    <div
      style={{
        maxWidth: "100vw",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#dbdeee",
            minHeight: "100vh",
          }}
        >
          <HeaderAndNavBar />
          <Box
            sx={{
              margin: {
                xs: "2px 10px",
                sm: "10px 100px",
              },
            }}
          >
            <BookDetails id={id} data={state} />
            <CommnetForm id={`${id}`} refetch={refetch} />
            <DisplayComment state={state} />
            <MuiBackDrop open={isLoading} />
          </Box>

          <FooterC />
        </Box>
      </Box>
    </div>
  );
};

export default BookDisplay;

const DisplayComment = ({ state }: { state: any }) => {
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 1, paddingTop: 5 }}
      >
        <Typography variant="h6">comments</Typography>
        {/* <CommentCard item ={{}}/> */}
        {state?.comments?.map((item: any, i: any) => {
          return (
            <CommentCard
              item={item}
              count={state?.comments?.length + ""}
              key={i}
            />
          );
        })}
      </Box>
    </>
  );
};

const CommnetForm = ({ id, refetch }: { id: string; refetch: any }) => {
  const [formData, setFormData] = React.useState({
    comment: "",
    ratting: "",
  });
  const [rattingError, setRattingError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [errorComment, setErrorCommnt] = React.useState(false);
  const [Loginopen, setLoginOpen] = useState(false);
  const [makeComment, { isLoading, isSuccess }] = useMakeCommentMutation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <>
      <Paper sx={{ padding: "10px 0 5px 0", marginTop: "8px" }}>
        <form
          action=""
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "20px",
            paddingTop: "10px",
          }}
        >
          <Box
            justifyContent="center"
            display="flex"
            flexDirection="row"
            gap={2}
            marginBottom="10px"
          >
            <TextField
              name="comment"
              placeholder="Comment"
              value={formData.comment}
              onChange={handleInputChange}
              helperText={commentError ? "CantBe empty" : ""}
              error={commentError}
            />
            <TextField
              name="ratting"
              placeholder="Ratting"
              value={formData.ratting}
              onChange={handleInputChange}
              error={rattingError}
              helperText={rattingError ? "Should be 1 to 5 only" : ""}
            />
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            height="50px"
            marginLeft="1%"
          >
            <Button
              onClick={async () => {
                try {
                  // handel comment error

                  if (formData.comment === "") {
                    setCommentError(true);
                    return;
                  } else setCommentError(false);
                  let rattingDta: any = formData.ratting;
                  rattingDta = rattingDta * 1;
                  console.log(rattingDta);
                  // handel ratting error
                  if (rattingDta) {
                    if (rattingDta < 6 && rattingDta > 0) {
                      setRattingError(false);
                    } else {
                      setRattingError(true);
                      return;
                    }
                  } else {
                    console.log(rattingDta, "ratting datatatatatta");

                    setRattingError(true);
                    return;
                  }
                  console.log("API CALLLLLL");
                  let result: any = await makeComment({
                    id: id,
                    data: formData,
                  });

                  if (result.data !== null) {
                    setErrorCommnt(true);
                  } else {
                    setErrorCommnt(false);
                  }
                  refetch();
                } catch (error) {}
              }}
              variant="contained"
              sx={{ height: "40px" }}
            >
              Post
            </Button>
            <MuiBackDrop open={isLoading} />
          </Stack>
        </form>
        <Typography color="error">
          {errorComment ? " please Login again or Token Missing" : ""}
        </Typography>
        <LoginModal
          open={Loginopen}
          handleCloseLoginModal={() => {
            setLoginOpen(false);
          }}
          handleOpenLoginModal={() => {}}
        />
        <span
          onClick={() => {
            setLoginOpen(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <b>
            <u>
              <i>click to Login</i>
            </u>
          </b>
        </span>
        <Typography textAlign="center" color="error">
          {isSuccess ? "comment Posted" : ""}
        </Typography>
      </Paper>
    </>
  );
};

const BookDetails = ({ id, data }: { id: any; data: any }) => {
  return (
    <Paper sx={{ padding: "2%" }}>
      <Stack direction="row" gap={2} sx={{}}>
        <Box
          flex={1}
          sx={{
            borderRadius: "5px",
            maxWidth: "200px",
          }}
        >
          <img style={{ width: "100%" }} src={data?.imageUrl} alt="####" />
        </Box>
        <Box
          flex={3}
          gap={0.5}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography variant="subtitle1" flex={1}>
            <b>Title:</b> {data?.title}
          </Typography>
          <Typography variant="body2" flex={1}>
            <b> Auther</b> {data?.author}
          </Typography>
          <Typography variant="body1" flex={5}>
            <b>decribtion :</b> {data?.description}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

const FooterC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fffff",
        height: "100px",
        alignContent: "end",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#80c8df",
      }}
    >
      <Typography>Footer</Typography>
    </Box>
  );
};
const HeaderAndNavBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fffff",
        height: "110px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "sticky",
        top: 0,
        background: "#80c8df",
        zIndex: 99,
        flexDirection: "column",
      }}
    >
      {/* header and nav bar */}

      <Box
        sx={{
          width: "100%",
          bgcolor: "#fffff",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // position: "sticky",
          top: 0,
          // background: "#dbdeee",
          // zIndex: 99,
        }}
      >
        <Typography>Header</Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#fffff",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "sticky",
          top: 90,
          background: "#6e6ca6",
          zIndex: 99,
        }}
      >
        <Typography>navbar</Typography>
      </Box>
    </Box>
  );
};
