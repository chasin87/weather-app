import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading() {
  return (
    <div className="Loader" style={{ textAlign: "center" }}>
      <CircularProgress color="inherit" />
      <div style={{ fontWeight: "400", textAlign: "center" }}>
        One moment please...
      </div>
    </div>
  );
}
