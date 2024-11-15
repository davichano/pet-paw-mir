import PropTypes from 'prop-types';

const FormField = ({
                     label,
                     type = "text",
                     placeholder = "",
                     options = [],
                     value,
                     onChange,
                     ...props
                   }) => {
  if (type === "radio") {
    return (
      <div className="flex items-center space-x-8 space-y-8">
        <label className="block text-sm text-[#FF4146] font-medium">{label}</label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              id={option.value}
              type="radio"
              value={option.value}
              checked={value === option.value} // Verifica si está seleccionado
              onChange={onChange} // Asigna el onChange desde las props
              className="w-5 h-5 text-blue-600"
              {...props}
            />
            <label htmlFor={option.value} className="ml-2 text-sm">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-900">{label}</label>
        <textarea
          placeholder={placeholder}
          value={value} // Asigna value
          onChange={onChange} // Asigna onChange
          className="block w-full px-4 py-2 mt-1 text-sm border rounded-lg"
          {...props}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[#FF4146] my-4">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value} // Asigna value
        onChange={onChange} // Asigna onChange
        className="block w-full px-4 py-2 mt-1 text-sm border-2 border-[#FFB0A9] rounded-lg text-[#FF797D] placeholder-[#FF797D]"
        {...props}
      />
    </div>
  );
};

// Añadir PropTypes
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'radio', 'textarea', 'file', 'number', 'datetime-local']),
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Asigna PropTypes para value
  onChange: PropTypes.func, // Añade PropTypes para onChange
};

export default FormField;
