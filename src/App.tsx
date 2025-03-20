import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import "./App.css";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import UserAccordion from "./components/UserAccordion";
import { GitHubUser } from "./types/types";

const App = () => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    onSubmit: async (values) => {
      if (!values.username) return;

      setLoading(true);
      try {
        const response = await axios.get<{ items: GitHubUser[] }>(
          `https://api.github.com/search/users?q=${values.username}&per_page=5`,
        );
        setUsers(response.data.items);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full flex flex-col md:flex-row gap-2">
          <TextField
            className="w-full md:w-3/4"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            placeholder="Enter Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <Button
            className="w-full md:w-1/4 h-[56px]"
            variant="contained"
            disabled={!formik.values.username || loading}
            type="submit"
          >
            {loading ? <CircularProgress size={24} /> : "Search"}
          </Button>
        </div>
      </form>

      {users.length > 0 && (
        <div className="w-full mt-8">
          <Typography variant="h6" gutterBottom>
            Matching Users:
          </Typography>
          {users.map((user) => (
            <UserAccordion key={user.id} userLogin={user.login} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
