export const PageSectionWrapper = ({ children, title, topRightOptions }) => {
  return (
    <div className='d-flex flex-column gap-2 w-100'>
      <div className='d-flex align-items-center justify-content-between mb-1'>
        <h2 className='fs-5 text-secondary mb-0'>{title}</h2>
        {!!topRightOptions && topRightOptions}
      </div>
      {children}
    </div>
  );
};
