export const Eyebrow = ({ children, light = false }) => (
  <p className={light ? "eyebrow light" : "eyebrow"}>{children}</p>
);
