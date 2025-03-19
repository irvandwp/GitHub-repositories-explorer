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
import { GitHubRepo } from "../types/types";

interface UserAccordionProps {
  userLogin: string;
  repos: GitHubRepo[] | undefined;
  isLoading: boolean;
  onExpand: () => void;
}

const UserAccordion = ({
  userLogin,
  repos,
  isLoading,
  onExpand,
}: UserAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (_event: React.SyntheticEvent, expanded: boolean) => {
    setIsExpanded(expanded);
    if (expanded) {
      onExpand();
    }
  };

  return (
    <Accordion expanded={isExpanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{userLogin}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size={24} />
          </Box>
        ) : repos && repos.length > 0 ? (
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
