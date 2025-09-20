class Student {
  constructor(id, name, age, course) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.course = course;
  }
  introduce() {
    return `Hi, my name is ${this.name}, I am ${this.age} years old, and I am enrolled in ${this.course}.`;
  }
}
class Course {
  constructor(id, course, description) {
    this.id = id;
    this.course = course;
    this.description = description;
  }
}

class Instructor {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }
  teach() {
    return `I am ${this.name} and I teach ${this.subject}.`;
  }
}


function loadWithThen() {
  fetch('data/students.json')
    .then(res => res.json())
    .then(showData)
    .catch(err => console.error('Error:', err));
}


async function loadWithAsync() {
  try {
    const res = await fetch('data/students.json');
    const data = await res.json();
    showData(data);
  } catch (err) {
    console.error('Error:', err);
  }
}


function showData(data) {
  const students = data.students.map(s => new Student(s.id, s.name, s.age, s.course));
   const course = data.course.map(i => new Course(i.id, i.course, i.description));
  const instructors = data.instructors.map(i => new Instructor(i.id, i.name, i.subject));

  let html = '<h2>Students</h2><ul>';
  students.forEach(s => {
    const cls = s.age > 21 ? 'student-over21' : '';
    html += `<li class="${cls}">${s.name} (${s.age}) - ${s.course}</li>`;
  });
  html += '</ul>';

  html += '<h2>Course</h2><ul>';
  course.forEach(i => {
    html += `<li>${i.course} - ${i.description}</li>`;
  });
  html += '</ul>';

  html += '<h2>Instructors</h2><ul>';
  instructors.forEach(i => {
    html += `<li>${i.name} - ${i.subject}</li>`;
  });
  html += '</ul>';

  document.getElementById('output').innerHTML = html;
  console.log('Students intro sample:', students[0].introduce());
  console.log('Course sample:', course[0].introduce());
  console.log('Instructor teach sample:', instructors[0].teach());
}


document.getElementById('load-then').addEventListener('click', loadWithThen);
document.getElementById('load-async').addEventListener('click', loadWithAsync);