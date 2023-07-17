async function getUsers() {
  const res = await fetch('https://dzmsabackend.azurewebsites.net/api/User');
  return await res.json()
}

export default async function Home() {
  const users = await getUsers()
  
  return (
      <main className=''>
          {JSON.stringify(users)}
      </main>
  );
}
