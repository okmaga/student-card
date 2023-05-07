import React, {useEffect, useState} from 'react';
import TextField from "../components/form/textField";
import {useHistory} from "react-router-dom";
import api from "../api";
import { validator } from "../utils/validator";

const EditStudentPage = () => {
  const [student, setStudent] = useState({
    firstname: "",
    lastname: "",
    yearOfBirth: "",
    portfolio: ""
  });
  const [pageState, setPageState] = useState("create");
  const [errors, setErrors] = useState([]);
  const validatorConfig = {
    firstname: {
      isRequired: { message: "Имя является обязательным полем для заполнения" },
      lettersOnly: { message: "Имя может содержать только буквы" }
    },
    lastname: {
      isRequired: { message: "Фамилия является обязательным полем для заполнения" },
      lettersOnly: { message: "Фамилия может содержать только буквы" }
    },
    yearOfBirth: {
      isRequired: { message: "Год является обязательным полем для заполнения" },
      isYear: { message: "Укажите год рождения от 1900 до 2010" }
    },
    portfolio: {
      isRequired: { message: "Портфолио является обязательным полем для заполнения" },
      isUrl: { message: "Портфолио должно быть url ссылкой" }
    }
  };
  const history = useHistory();
  useEffect(()=> {
    api.student.fetchStudent().then((data) => {
      if (!data) return;
      setStudent(JSON.parse(data));
      setPageState("edit");
    })
  }, [])
  useEffect(() => {
    console.log(student);
    validate();
  }, [student]);

  const validate = () => {
    const errors = validator(student, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (target) => {
    const { name, value } = target;
    setStudent(prev => ({ ...prev, [name]: value }))
  };

  const handleSubmit = (e) => {
    console.log(student);
    e.preventDefault();
    api.student.updateStudent(student);
    history.push("/");
  };

  if (student) {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-10 .offset-md-1 p-4 mx-auto">
            <h1>{pageState === "edit" ? "Редактировать" : "Создать"}</h1>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="firstname"
                value={student.firstname}
                onChange={handleChange}
                error={errors.firstname}
              />
              <TextField
                label="Фамилия"
                name="lastname"
                value={student.lastname}
                onChange={handleChange}
                error={errors.lastname}
              />
              <TextField
                label="Год рождения"
                name="yearOfBirth"
                value={student.yearOfBirth}
                onChange={handleChange}
                error={errors.yearOfBirth}
              />
              <TextField
                label="Портфолио"
                name="portfolio"
                value={student.portfolio}
                onChange={handleChange}
                error={errors.portfolio}
              />
              {pageState === "edit" && <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => {history.push("/")}}
              >Назад</button>}
              <button type="submit" className="btn btn-primary me-2">
                {pageState === "edit" ? "Обновить" : "Создать"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
};
export default EditStudentPage;
