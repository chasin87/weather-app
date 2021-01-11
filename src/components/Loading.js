import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading() {
  return (
    <div className="Loader">
      <CircularProgress color="inherit" />
      <div style={{ fontWeight: "400" }}>One moment please...</div>
    </div>
  );
}
