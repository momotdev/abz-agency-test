import React, {useState} from 'react';
import "./styles/post-request-section.scss"
import {useForm} from "react-hook-form";
import {useQuery, useQueryClient} from "react-query";
import {fetchPositions} from "../../api/positions";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import BasicButton from "../BasicButton/BasicButton";
import {createUser} from "../../api/users";
import successSVG from './assets/success-image.svg';

const phoneRegExp = /^[+]?380([0-9]{9})$/;
const FILE_SIZE = 5000000; // 5MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg'];

const schema = yup
    .object({
      name: yup.string().min(2).max(60).required(),
      email: yup.string().email().test('dot', 'Email must contain a dot (".")',
          (value) => {
            return value && value.includes('.');
          }).required(),
      phone: yup.string().matches(phoneRegExp, 'Phone number must start with +380 and have another 9 digits'),
      position: yup.string().required(),
    }).shape({
      picture: yup.mixed()
          .test(
              'isExist',
              'Please upload a file.',
              value => value[0]?.name
          )
          .test(
              "fileSize",
              "File too large. Maximum file size is 5 MB.",
              value => value[0] && value[0].size <= FILE_SIZE
          )
          .test(
              "fileFormat",
              "Unsupported image format",
              value => value[0] && SUPPORTED_FORMATS.includes(value[0].type)
          )
    })
    .required()

const PostRequestSection = () => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const queryClient = new useQueryClient();
  const [isRegistered, setIsRegistered] = useState(false);
  const {data} = useQuery(['positions'], fetchPositions,);
  const onSubmit = async (data) => {
    await createUser({...data, picture: data.picture[0]})
        .then(response => {
          if (response.success) {
            setIsRegistered(true);
            queryClient.invalidateQueries({queryKey: ['users']})
          } else {
            console.error(response.message)
            console.table(response.fails)
          }
        })

  };

  return (
      <section className="post-request-section">
        <div className="post-request-section__title">
          {isRegistered ? "User successfully registered" : "Working with POST request"}
        </div>
        {!isRegistered && (<form onSubmit={handleSubmit(onSubmit)} className="post-request-section__form">
          <div className="post-request-section__input-group">
            <div className="post-request-section__input-box">
              <input className="post-request-section__input"
                     placeholder="Your name" {...register("name", {required: true, minLength: 2, maxLength: 60})} />
              <label>Your name</label>
              {errors.name &&
                  <span
                      className="post-request-section__helped-text post-request-section--error-text">{errors.name.message}</span>}
            </div>
            <div className="post-request-section__input-box">
              <input className="post-request-section__input"
                     placeholder="Email" {...register("email", {required: true})} />
              <label>Email</label>
              {errors.email &&
                  <span
                      className="post-request-section__helped-text post-request-section--error-text">{errors.email.message}</span>}
            </div>

            <div className="post-request-section__input-box">
              <input className="post-request-section__input" type="tel"
                     placeholder="Phone" {...register("phone", {required: true})} />
              <label>Phone</label>
              <span className="post-request-section__helped-text">+38 (XXX) XXX - XX - XX</span>
              {errors.phone &&
                  <span
                      className="post-request-section__helped-text post-request-section--error-text">{errors.phone.message}</span>}
            </div>
          </div>
          <fieldset className="post-request-section__select">
            <label>Select your position</label>
            {data?.positions.map((position, index) => (
                <div key={position.id} className="post-request-section__radio-box">
                  <input type="radio" id={position.id}
                         defaultChecked={index === 0} {...register("position", {required: true})} name="position"
                         value={position.id}/>
                  <label htmlFor={position.id}>{position.name}</label>
                </div>))}
          </fieldset>
          {errors.position &&
              <span
                  className="post-request-section__helped-text post-request-section--error-text">{errors.position.message}</span>}

          <div className="post-request-section__file">
            <div>
              <label className="post-request-section__file-label" htmlFor="picture">Upload</label>
              <input className="post-request-section__file-input"
                     type="file"
                     {...register("picture")}
                     id="picture"/>
            </div>
            {errors.picture &&
                <span
                    className="post-request-section__helped-text post-request-section--error-text">{errors.picture.message}</span>}
          </div>


          <div className="post-request-section__form-submit-button">
            <BasicButton type="submit">Sign up</BasicButton>
          </div>
        </form>)}

        {isRegistered && (
            <div className="post-request-section__form--success">
              <img src={successSVG} alt="Successfully registered"/>
            </div>
        )}
      </section>
  );
};

export default PostRequestSection;