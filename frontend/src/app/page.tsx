import dotenv from 'dotenv'
dotenv.config()

async function getUsers() {
  const res = await fetch(`http://localhost:8080/api/User`);
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
