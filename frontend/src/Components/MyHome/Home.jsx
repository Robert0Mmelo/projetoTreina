import { Link } from 'react-router-dom';

function Home() {
   return (
     <div>
      <div className="container d-flex flex-column justify-content-center align-items-center text-center min-vh-100">
      <h1 className="fw-bold">Seu curriculo automático!</h1>
      <h3 className="text-muted w-75">Preencha os campos com suas informações, e crie seu curriculo automaticamente</h3>
      <Link to="/editar" className="btn btn-dark mt-3">
          Criar/Editar Currículo
        </Link>
      </div>
     </div>
   );
 }
 
 export default Home