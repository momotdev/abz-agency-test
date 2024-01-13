import React from 'react';

const BasicInput = ({ register, name, errors, placeholder, helpText, ...props }) => {
  return (
    <div className='input-box'>
      <input
        {...register(name)}
        className={'input-box__field ' + (errors ? ' input-box__field--error' : '')}
        placeholder={placeholder}
        {...props}
      />
      <label>{placeholder}</label>
      {helpText && <span className='input__helped-text'>{helpText}</span>}
      {errors && <span className='input__helped-text input--error-text'>{errors.message}</span>}
    </div>
  );
};

export default BasicInput;
