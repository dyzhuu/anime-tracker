import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret, raw: true })

  return NextResponse.json({ token });
}
