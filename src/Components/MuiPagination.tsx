import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function MuiPagination({
  handlePageChange,
  totalNoofDta,
}: {
  handlePageChange: any;
  totalNoofDta: any;
}) {
  function handelParginatin() {
    let roundoff = Math.round(totalNoofDta / 10);
    let devited = totalNoofDta / 10;
    if (roundoff < devited) {
      return roundoff + 1;
    } else return roundoff;
  }
  return (
    <Stack spacing={2}>
      <Pagination
        count={handelParginatin()}
        // page={page} // Set the current page
        onChange={handlePageChange}
      />
    </Stack>
  );
}
