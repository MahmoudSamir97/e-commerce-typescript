import { memo } from "react";

const Heading = memo(({ title }: { title: React.ReactNode }) => {
  return (
    <h2 className="mb-3 text-capitalize" style={{ fontSize: "1.25rem" }}>
      {title}
    </h2>
  );
});

export default Heading;
