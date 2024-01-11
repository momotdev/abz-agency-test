import React from 'react';
import "./styles/post-request-section.scss"
import {useForm} from "react-hook-form";
import {useQuery} from "react-query";
import {fetchPositions} from "../../api/positions";

const PostRequestSection = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const {data} = useQuery(['positions'], fetchPositions,);

  return (
      <section className="post-request-section">
        <div className="post-request-section__title">Working with POST request</div>
        <form onSubmit={handleSubmit(onSubmit)} className="post-request-section__form">
          <div className="post-request-section__input-group">
            <div className="post-request-section__input-box">
              <input className="post-request-section__input"
                     placeholder="Your name" {...register("name", {required: true, minLength: 2, maxLength: 60})} />
              <label>Your name</label>
            </div>
            <div className="post-request-section__input-box">
              <input className="post-request-section__input"
                     placeholder="Email" {...register("email", {required: true})} />
              <label>Email</label>
            </div>

            <div className="post-request-section__input-box">
              <input className="post-request-section__input" type="tel"
                     placeholder="Phone" {...register("phone", {required: true})} />
              <label>Phone</label>
              <span className="post-request-section__helped-text">+38 (XXX) XXX - XX - XX</span>
            </div>
          </div>
          <fieldset className="post-request-section__select">
            <label>Select your position</label>
            {data?.positions.map(position => (
                <div key={position.id} className="post-request-section__radio-box">
                  <input type="radio" id={position.id} {...register("position", {required: true})} name="position"
                         value={position.id}/>
                  <label htmlFor={position.id}>{position.name}</label>
                </div>))}
          </fieldset>
          {errors.exampleRequired && <span>This field is required</span>}
          <label htmlFor="avatar">Choose a profile picture:</label>

          <input type="file" id="avatar" name="avatar" accept="image/jpeg" />

          <input type="submit"/>
        </form>
      </section>
  );
};

export default PostRequestSection;