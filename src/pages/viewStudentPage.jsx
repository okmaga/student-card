import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import api from "../api";


const ViewStudentPage = () => {
  const [student, setStudent] = useState();
  const history = useHistory();
  useEffect(()=> {
    api.student.fetchStudent().then((data) => setStudent(JSON.parse(data)))
  }, [])
  useEffect(() => {
    console.log(student);
  }, [student]);

  const handleClick = () => {
      history.push("/edit")
  };
  const getStudentAge = (yearOfBirth) => {
    const age = new Date(Date.now()).getFullYear() - Number(yearOfBirth);
    const ageLastDigit = age.toString().slice(-1)
    const ageDescription =
      ageLastDigit === "1"
        ? " год"
        : (ageLastDigit === "2" || ageLastDigit === "3"|| ageLastDigit === "4")
          ? " года"
          : " лет"
    return age + ageDescription;
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-10 .offset-md-1 p-4 mx-auto">
          <h1>Карточка студента</h1>
          {!student && <p>Нет данных</p>}
          {student && <>
            <div><strong>Имя:</strong> {student.firstname}</div>
            <div><strong>Фамилия:</strong> {student.lastname}</div>
            <div><strong>Год рождения:</strong> {student.yearOfBirth} ({getStudentAge(student.yearOfBirth)})</div>
            <div><strong>Портфолио:</strong> <a href={student.portfolio}>{student.portfolio}</a></div>
          </>
          }
          <button className="btn btn-primary mt-3" onClick={handleClick} >
            {student ? "Редактировать" : "Добавить" }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentPage;
