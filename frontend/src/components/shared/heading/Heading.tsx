const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="mb-3 text-capitalize" style={{ fontSize: "1.25rem" }}>
      {children}
    </h2>
  );
};

export default Heading;
