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
import BasicInput from "../BasicInput/BasicInput";
import FileUpload from "../FileUpload/FileUpload";
import Preloader from "../Preloader/Preloader";

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
  const [isLoading, setIsLoading] = useState(false);
  const {data} = useQuery(['positions'], fetchPositions,);
  const onSubmit = async (data) => {
    setIsLoading(true);
    await createUser({...data, picture: data.picture[0]})
        .then(response => {
          if (response.success) {
            setIsRegistered(true);
            queryClient.invalidateQueries({queryKey: ['users']})
          } else {
            /*In the design, we do not have any cases of error handling from server, so there I only use the log.*/
            console.error(response.message)
            console.table(response.fails)
          }
          setIsLoading(false);
        })

  };

  return (
      <section className="post-request-section">
        {isLoading && (
            <div className="post-request-section__preloader-wrapper">
              <Preloader/>
            </div>
        )}
        {!isLoading && (
            <div className="post-request-section__title">
          {isRegistered ? "User successfully registered" : "Working with POST request"}
        </div>)
        }
        {!isRegistered && !isLoading && (<form onSubmit={handleSubmit(onSubmit)} className="post-request-section__form">
          <div className="post-request-section__input-group">
            <BasicInput name="name" placeholder="Your name" register={register} errors={errors.name}/>
            <BasicInput name="email" placeholder="Email" register={register} errors={errors.email}/>
            <BasicInput name="phone" placeholder="Phone" helpText="+38 (0XX) XXX - XX - XX" register={register}
                        errors={errors.phone}/>
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
          <FileUpload name="picture" register={register} errors={errors.picture}/>
          <div className="post-request-section__form-submit-button">
            <BasicButton type="submit">Sign up</BasicButton>
          </div>
        </form>)}
        {isRegistered && !isLoading && (
            <div className="post-request-section__form--success">
              <img src={successSVG} alt="Successfully registered"/>
            </div>
        )}
      </section>
  );
};

export default PostRequestSection;