import Box from "@mui/material/Box"
import React from "react"

const Background: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box
        sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         //   backgroundColor: "rgba(26, 26, 26, 1)",
            background: `linear-gradient(140deg, #0000ff 0%, #007cf0 40%, #f057b7 85%) `,
        }}
    >{children}</Box>
)

export default Background