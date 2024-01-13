import React from 'react';

const FileUpload = ({ name, register, errors, ...props }) => {
  return (
    <div className='input__file'>
      <div>
        <label className={'input__file-label' + (errors ? ' input__file-label--error' : '')} htmlFor='picture'>
          Upload
        </label>
        <input
          className={'input__file-input' + (errors ? ' input__file-input--error' : '')}
          type='file'
          accept='image/jpeg'
          {...register(name)}
          {...props}
          id='picture'
        />
      </div>
      {errors && <span className='input__helped-text input--error-text'>{errors.message}</span>}
    </div>
  );
};

export default FileUpload;
