import Clients from '../components/Clients.jsx';
import useScrollAnimations from '../hooks/useScrollAnimations.js';

export default function ProjectsPage({ content }) {
  useScrollAnimations();

  return <Clients content={content} />;
}
