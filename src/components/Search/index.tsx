import { SearchOutlined } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";

function Search() {
    return (
        <>
            <Paper
                component="form"
                sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 450,
                    maxWidth: "100%",
                }}
            >
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
                <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                >
                    <SearchOutlined />
                </IconButton>
            </Paper>
        </>
    );
}

export default Search;
