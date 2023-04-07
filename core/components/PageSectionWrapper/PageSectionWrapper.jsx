export const PageSectionWrapper = ({ children, title }) => {
  return (
    <div className='d-flex flex-column gap-2 w-100'>
      <h2 className='fs-5 text-secondary'>{title}</h2>
      {children}
    </div>
  );
};
