import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <div className="footer">
      <div className="icons">
        <a
          href="https://www.linkedin.com/in/your_username/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon sx={{ fontSize: 38 }} />
        </a>
        <a
          href="https://github.com/saivaraprasad195"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon sx={{ fontSize: 35 }} />
        </a>

        <a
          href="https://x.com/SaiVara1999"
          target="_blank"
          rel="noopener noreferrer"
        >
          <XIcon sx={{ fontSize: 35 }} />
        </a>
        <a
          href="https://www.instagram.com/saivaraprasad295/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon sx={{ fontSize: 35 }} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
