import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import useFetchRepositories from "../hooks/useFetchRepositories";


interface UserAccordionProps {
  userLogin: string;
}

const UserAccordion = ({ userLogin }: UserAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { repos, loading, error } = useFetchRepositories(
    isExpanded ? userLogin : ""
  );

  const handleChange = (_event: React.SyntheticEvent, expanded: boolean) => {
    setIsExpanded(expanded);
    if (expanded) {
        setIsExpanded(expanded);
    }
  };

  return (
    <Accordion expanded={isExpanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{userLogin}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size={24} />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : repos.length > 0 ? (
          repos.map((repo) => (
            <Card
              className="cursor-pointer"
              onClick={() => window.open(repo.html_url, "_blank")}
              key={repo.id}
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                marginBottom: 2,
                border: "1px solid transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "action.hover",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">{repo.name}</Typography>
                  <Box display="flex" alignItems="center">
                    <StarIcon fontSize="small" sx={{ color: "gold" }} />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {repo.stargazers_count}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  {repo.description || "No description available."}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No repositories found.</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default UserAccordion;
