async function getUsers() {
  const res = await fetch(`http://backend:8080/api/User`);
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
