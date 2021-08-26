import 'bootstrap/dist/css/bootstrap.min.css'
import buildClient from '../api/build-client'
import Navbar from '../components/Navbar'

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Navbar currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  )
}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);

  const { data } = await client.get('/api/users/currentuser');

  // This is to execute 'getInitialProps' of a component
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    currentUser: data.currentUser
  }
}

export default AppComponent;