import buildClient from '../api/build-client';
import Router from 'next/router';
const LandingPage = ({ currentUser }) => {
  console.log(currentUser)
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

LandingPage.getInitialProps = async context => {
  console.log('LANDING PAGE!');
  // console.log(context)
  // Check if the cookie is available in the request headers
  // const cookie = context.req ? context.req.headers.cookie : null;
  // if(!cookie){
  //   return {currentUser:null}
  // }
  const client = buildClient(context);
  try{
    const { data } = await client.get('/api/users/cuser');

    return data;
  }
  catch(error){
    if (error.response && error.response.status === 401) {
      // Perform actions for unauthorized access, e.g., redirect to login page
      console.log('Unauthorized access. Redirecting to login page...');
      // Example: context.res.writeHead(302, { Location: '/login' });
      //          context.res.end();
      // You may also use a router to redirect if you are using a client-side framework like Next.js.
    } else {
      // Handle other errors here
      console.error('An error occurred:', error.message);
    }
    return {currentUser:null}
  }
};

export default LandingPage;
