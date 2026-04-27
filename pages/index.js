import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Redirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/blog');
  }, [router]);
  
  return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
}
