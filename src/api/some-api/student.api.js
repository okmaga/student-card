const fetchStudent = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const student = localStorage.getItem("student");
      resolve(student);
    }, 0)
  })
}

const updateStudent = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem("student", JSON.stringify(data));
      resolve(data);
    }, 0)
  })
}

export default {
  fetchStudent,
  updateStudent
}