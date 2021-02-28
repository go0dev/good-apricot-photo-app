import { unstable_createRoot as createRoot } from 'react-dom';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import 'firebase';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(<App />);

reportWebVitals();
