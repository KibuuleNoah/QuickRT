/* ── Success ─────────────────────────────────────────── */

const AuthSuccess = () => {
  return (
    <StepCard center>
      <motion.div
        className="text-5xl mb-2"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <IconCircleCheck size={60} className="text-green-500" />
      </motion.div>
      <Heading>
        <span className="text-green-500">You're in!</span>
      </Heading>
      <Sub>Welcome to WinHub. Start scratching and winning.</Sub>
      <PrimaryBtn onClick={() => {}}>Go to Dashboard →</PrimaryBtn>
    </StepCard>
  );
};

export default AuthSuccess;
