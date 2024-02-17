import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, Stack } from "@mui/material";
import BookCard from "../Components/Crad/BookCard";
import MuiPagination from "../Components/MuiPagination";
import FilterOptions from "../Components/FilterOptions";
import { useNavigate } from "react-router-dom";
import { useBooksQuery } from "../Redux/api/LoginRegister";
import MuiBackDrop from "../Components/MuiBackDrop";

const BookListPage = () => {
  //pagination
  const [page, setPage] = React.useState(1);
  const {
    data: reduxdata,
    error,
    isLoading,
    refetch,
    isError,
  } = useBooksQuery({});
  const [booksData, setBooksData] = useState<any[]>([]);
  const [Loginopen, setLoginOpen] = useState(false);
  let getData = useCallback(() => {
    setBooksData(reduxdata?.books);
  }, [reduxdata]);

  useEffect(() => {
    getData();
  }, [getData, reduxdata]);

  const handlePageChange = (event: any, value: any) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#dbdeee",
        minHeight: "100vh",
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      <HeaderAndNavBar />
      <Box
        sx={{
          // height: "700px",
          margin: {
            xs: "0 10px",
            sm: "0 100px",
          },
        }}
      >
        <Typography variant="h5" p={1}>
          Book List
        </Typography>

        <MuiBackDrop open={isLoading} />

        <Stack direction="row" gap={2}>
          <Box
            flex={2}
            sx={{
              position: "sticky",
              top: 150,
              height: "50vh",
              maxWidth: 250,
            }}
          >
            <FilterOptions
              refetch={refetch}
              Loginopen={Loginopen}
              setLoginOpen={setLoginOpen}
            />
          </Box>
          <Box flex={5}>
            {" "}
            <ListOfBooks booksData={booksData} pageNo={page} />
            <Typography color="error" textAlign="center">
              {error ? "error can't fetch the books" : ""}
            </Typography>
            <Typography color="error" textAlign="center">
              {isError ? "some error to fetch the books" : ""}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <MuiPagination
          handlePageChange={handlePageChange}
          totalNoofDta={booksData?.length}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#80c8df",
          height: "100px",
          alignContent: "end",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Footer</Typography>
      </Box>
    </Box>
  );
};

export default BookListPage;

const ListOfBooks = ({
  booksData,
  pageNo,
}: {
  booksData: any;
  pageNo: any;
}) => {
  const [data, setData] = useState<any[]>([]);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  // pagination
  const handelPagination = useCallback(() => {
    let demoArray = [];

    for (let i in booksData) {
      demoArray.unshift(booksData[i]);
    }
    const startIndex = (pageNo - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const d = demoArray?.slice(startIndex, endIndex);
    setData(d);
  }, [pageNo, booksData]);
  useEffect(() => {
    handelPagination();
  }, [pageNo, booksData, handelPagination]);
  return (
    <>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {data?.map((item: any, i: any) => {
          return (
            <div
              key={i}
              onClick={() => {
                navigate(`/book/${item._id}`);
              }}
            >
              <BookCard item={item} />
            </div>
          );
        })}
      </Stack>
    </>
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
