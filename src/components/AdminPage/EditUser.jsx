import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import useAllUsers from "../../hooks/useAllUsers";

const EditUser = ({ user, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isActive: user.isActive ? "true" : "false",
    },
  });
  const { updateUser, updateLoading } = useAllUsers();

  const onSubmit =async  (data) => {
    data.isActive = data.isActive === "true";
    await updateUser(user.id, data);
    onClose()
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nombre */}
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            {...register("name", { required: "El nombre es obligatorio" })}
            className="border p-2 w-full"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Apellido */}
        <div>
          <label htmlFor="lastName">Apellido</label>
          <input
            id="lastName"
            {...register("lastName", {
              required: "El apellido es obligatorio",
            })}
            className="border p-2 w-full"
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "El email no es válido",
              },
            })}
            className="border p-2 w-full"
            readOnly
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Rol */}
        <div>
          <label htmlFor="role">Rol</label>
          <select
            id="role"
            defaultValue={user.role}
            {...register("role", { required: "El rol es obligatorio" })}
            className="border p-2 w-full"
          >
            <option value="USER">Usuario</option>
            <option value="ADMINISTRATOR">Administrador</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}
        </div>

        {/* Activo */}
        <div>
          <label htmlFor="isActive">Activo</label>
          <select
            id="isActive"
            defaultValue={user.isActive ? "true" : "false"}
            {...register("isActive", {
              required: "El estado es obligatorio"
            })}
            className="border p-2 w-full"
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
          {errors.isActive && (
            <p className="text-red-500">{errors.isActive.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {updateLoading ? "Actualizando..." : "Actualizar"}
        </button>
      </form>
    </div>
  );
};

EditUser.propTypes = {
  user: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditUser;
