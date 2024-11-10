import  useAllUsers  from '../../hooks/useAllUsers';

const Users = () => {
  const {users, loading, error} = useAllUsers();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar usuarios: {error.message}</div>;


  return (
    <div>

      <table>
        <thead>
          <tr>
            <th>Nombres y apellidos</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length>0 ? users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          )): <tr><td colSpan="3">No hay usuarios</td></tr>}
        </tbody>

      </table>
    </div>
  );
}

export default Users;
