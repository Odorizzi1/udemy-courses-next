import axios from 'axios';

function Cursos({ courses }) {
  return (
    <div>
      <h1>Cursos da Udemy</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <a href={course.url}>{course.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const clientId = "TTwmoP1iGLmk2sfBEPnHVN38zVWV9MakOUhWTgW0";
  const clientSecret = "XrMvWOpiQyrXpakbYrSllz70R5V6EPs66dmk5mhqOf1X56ceqXVAeqlevDtCEBVZm8AdZR06hYwGp3WIrJm88ojN3MbbDBzNTDcWvIwDDhPJt8K978OARD44pEoUcqXc";

  const authToken = `${clientId}:${clientSecret}`;
  const encodedToken = Buffer.from(authToken).toString('base64');

  const response = await axios.get(
    `https://www.udemy.com/api-2.0/courses/?search=&price=price-free,price-paid&price_currency=brl&fields[course]=@default,visible_instructors&ordering=-price&language=pt&skip_price=1&page=1&page_size=10`,
    {
      headers: {
        Authorization: `Basic ${encodedToken}`,
      },
    }
  );

  const courses = response.data.results;
  const filteredCourses = courses.filter((course) => course.price === 'Free');
  const courseData = filteredCourses.map((course) => {
    return {
      id: course.id,
      title: course.title,
      url: course.url,
    };
  });

  return {
    props: {
      courses: courseData,
    },
  };
}

export default Cursos;

