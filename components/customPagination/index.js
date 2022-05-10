import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const AutoPagination = ({ pageCount, currentPage, onChangeCurrentPage }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        page={currentPage}
        siblingCount={1}
        boundaryCount={1}
        hidePrevButton
        hideNextButton
        size="medium"
        sx={{
          "& button.Mui-selected": {
            color: "#ffffff",
          },
        }}
        onChange={onChangeCurrentPage}
      />
    </Stack>
  );
};

export default AutoPagination;
