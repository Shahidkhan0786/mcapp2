import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
import Router from 'next/router';
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  // Check if the cookie is available in the request headers
  const cookie =appContext.ctx.req ? appContext.ctx.req.headers.cookie : null;
  let pageProps = {};
  try{
  const { data } = await client.get('/api/users/cuser');
  return {
    pageProps,
    ...data
  };
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
 
  
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  
};

export default AppComponent;
