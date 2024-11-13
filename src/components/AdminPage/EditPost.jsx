import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";

const EditPost = ( {post, onClose, handleEditClick} ) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post.title,
    },
  });

  const onSubmit = async (data) => {
    await handleEditClick(post.id, data);
    onClose();
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div className="flex">
          <label htmlFor="title" className="p-2">Título</label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            className="border p-2 w-full"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

      </form>
    </div>
  );
}

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};

export default EditPost;
