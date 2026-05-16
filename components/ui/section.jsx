export function Section({ id, children, className = "", as: Tag = "section" }) {
  return (
    <Tag id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      {children}
    </Tag>
  );
}
