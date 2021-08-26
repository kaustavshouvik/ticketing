import buildClient from '../api/build-client';

const Home = ({ currentUser }) => {
  console.log(currentUser);
  
  return (
    <div>
      <h2>Welcome to ticketing Homepage! YAAAYYY!</h2>
    </div>
  )
}

Home.getInitialProps = async (context) => {
  console.log('Landing page!')
  
  const client = buildClient(context);

  const { data } = await client.get('/api/users/currentuser');

  return data;
}

export default Home;