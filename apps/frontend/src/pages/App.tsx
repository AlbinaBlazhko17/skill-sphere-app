import { RouterProvider } from 'react-router';
import { router } from '@/libs/router/router.config';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
