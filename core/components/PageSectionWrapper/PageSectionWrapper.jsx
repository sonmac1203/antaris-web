export const PageSectionWrapper = ({ children, title, topRightOptions }) => {
  return (
    <div className='d-flex flex-column gap-2 w-100'>
      <div className='d-flex align-items-center justify-content-between mb-1'>
        <div className='d-flex align-items-center gap-2'>
          <h2 className='fs-5 text-secondary mb-0'>{title}</h2>
          <i className='fa-regular fa-circle-question text-secondary fs-6' />
        </div>
        <div className='d-flex align-items-center gap-2'>
          {!!topRightOptions && topRightOptions}
        </div>
      </div>
      {children}
    </div>
  );
};
