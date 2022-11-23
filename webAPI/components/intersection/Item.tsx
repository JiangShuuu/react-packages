import { forwardRef } from 'react';

const Item = (props: any, ref: any) => {
  const color = props.props;
  return (
    <div
      style={{
        width: '200px',
        minHeight: '200px',
        position: 'relative',
        margin: '2rem 0',
        transition: 'background .2s'
      }}
      ref={ref}
      className={color}>
      <div
        style={{
          position: 'absolute',
          top: '0',
          right: '-3rem',
          display: 'flex'
        }}>
        <div
          style={{
            marginTop: '-12px'
          }}>
          <span>-------</span>
          <span>0%</span>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-3.5rem',
          display: 'flex'
        }}>
        <div
          style={{
            marginTop: '-12px'
          }}>
          <span>-------</span>
          <span>50%</span>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '100%',
          right: '-4rem'
        }}>
        <div
          style={{
            marginTop: '-12px'
          }}>
          <span>-------</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Item);
